import bcryptjs from "bcryptjs";
import { URL } from "../models/url.model.js";
import { formatDate, formatDateDash } from "../utils/formatDate.js";
import { UAParser}  from "ua-parser-js";
import { Analytics } from "../models/analytics.model.js";
import { Dashboard } from "../models/dashboard.model.js";


//Create Link Function
export async function createLink(req, res) {
  try {
    const { newUrl, remarks, expiration } = req.body;

   
    if (!newUrl || !remarks) {
      
      return res.status(400).json({ success: false, message: "URL and remarks are required." });
    }

    try {
      new globalThis.URL(newUrl);
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid URL format." });
    }

    //Creating Aplhanumeric string
    const hash = bcryptjs.hashSync(newUrl, 0).replace(/[^a-zA-Z0-9]/g, '').slice(0, 8); 
   
    const linkData = {
      user: req.user.id, 
      url: newUrl,
      shorturl: `${req.protocol}://${req.get("host")}/${hash}`,
      remark: remarks,
      status: true,
    };

   //Handling Expiration Date
    if (expiration) {
     linkData.expiration = formatDate(expiration);
    }
    
    const newLink = new URL(linkData);
    await newLink.save();

    res.status(201).json({
      success: true,
      message: "Shortened URL created successfully.",
      data: newLink,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
}

//Fetch Links Page
export async function fetchLinks(req, res) {
  try {
    //Finding by key
    const links = await URL.find({ user: req.user.id }).select(
      "date url shorturl remark clicks status expiration"
    );

    const formattedLinks = links.map(link => ({
      id: link._id,
      date: link.date, 
      url: link.url,
      shorturl: link.shorturl,
      remark: link.remark,
      clicks: link.clicks,
      status: link.status ? "Active" : "Inactive",
      expiration: link.expiration,
    }));

    res.status(200).json({
      success: true,
      message: "Links fetched successfully.",
      data: formattedLinks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
}

//Redirecting Function
export const redirectShortUrl = async (req, res) => {
  try {
   
    const { hash } = req.params;
    
    //User Data
    const ipHeader = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const permanentIp = Array.isArray(ipHeader) ? ipHeader[0] : ipHeader.split(",")[0].trim();
    const userAgent = req.headers["user-agent"];
    const parser = new UAParser(userAgent);
    const deviceType = parser.getDevice().type || "Desktop";
    const osName = parser.getOS().name || "Unknown OS"; // e.g., Android, iOS, Windows, macOS, etc.
    const browserName = parser.getBrowser().name || "Unknown Browser";
    
    
    //Constructing ShortUrl
    const shortPath = `${req.protocol}://${req.get("host")}/${hash}`;
   

    //Finding ShortUrl
    const urlDoc = await URL.findOne({ shorturl: shortPath });
    
    //Finding User Dashboard
    const userId = urlDoc.user._id;
    const dash = await Dashboard.findOne({ user : userId});

    //Error handling
    if (!urlDoc) {
      return res.status(404).json({ message: "Invalid shortUrl, please make sure your url is valid" });
    }
    if (!urlDoc.status) {
      return res.status(404).json({ message: "Sorry, shorturl your are trying to redirect is inactive" });
    }
    
    //Increment Clicks
    urlDoc.clicks += 1;
    await urlDoc.save(); 
    dash.totalClicks +=1;
    await dash.save();

    const today = formatDateDash(new Date());

    const existingEntry = await Dashboard.findOne({ user: userId, [`datewise.${today}`]: { $exists: true } });
    if (existingEntry) {
      // Increment click count for today
      await Dashboard.updateOne(
        { user: userId },
        { $inc: { [`datewise.${today}.clickCount`]: 1 } }
      );
    } else {
      //If today's date does not exists
      await Dashboard.updateOne(
        { user: userId },
        { $set: { [`datewise.${today}`]: { date: today, clickCount: 1 } } },
        { upsert: true } 
      );
    }
    
    const analyticsData = new Analytics({
      originalLink: urlDoc.url,
      shortLink: urlDoc.shorturl, 
      ip : permanentIp, 
      userDevice: deviceType,
      user: urlDoc.user._id,
     });

    await analyticsData.save();
    
    res.status(200).json({
      success: true,
      message: "Links fetched successfully.",
      url: urlDoc.url,
      ip: permanentIp,
      device: deviceType,
      os: osName,
      browser: browserName
    });
    
  } catch (error) {
    console.error("Error redirecting to URL:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

//Edit Link function
export const editLink = async (req, res) => {
  try {
    const { id, newUrl, remark, expiration } = req.body;

    if (!newUrl) {
      return res.status(400).json({ success: false, message: "URL is required." });
    }

    try {
      new globalThis.URL(newUrl);
    } catch (error) {
      return res.status(400).json({ success: false, message: "Invalid URL format." });
    }
    
    //Finding Link by Id
    const link = await URL.findById(id);
    if (!link) {
      return res.status(404).json({ success: false, message: "Link not found." });
    }
    
    link.url = newUrl;
    if (remark) {
      link.remark = remark;
    }
    if(expiration === null) {
      link.expiration = null;
      link.status = true;
    }
    if (expiration) {
      const formatedexpiration = formatDate(expiration);
      link.expiration = formatedexpiration;
      link.status = true;
    }

    link.date = formatDate(new Date())
    
    await link.save();

    res.status(200).json({
      success: true,
      message: "Link updated successfully.",
      data: link,
    });
  } catch (error) {
    console.error("Error editing link:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the link.",
      error: error.message,
    });
  }
};

//Delete Link Function
export const deleteLink = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "ID is required to delete the link.",
      });
    }
    //Finding Link by Id
    const deletedLink = await URL.findByIdAndDelete(id);
    if (!deletedLink) {
      return res.status(404).json({
        success: false,
        message: "Link not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Link deleted successfully.",
      data: deletedLink,
    });
  } catch (error) {
    console.error("Error deleting link:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the link.",
      error: error.message,
    });
  }
};
