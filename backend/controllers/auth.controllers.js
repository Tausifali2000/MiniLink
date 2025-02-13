import { User } from "../models/user.model.js"; 
import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js"; 
import { Dashboard } from "../models/dashboard.model.js";
import { formatDateDash } from "../utils/formatDate.js";


//signup function
export async function signup(req, res) {
  try {
    const { name, email, number, password } = req.body;

   //Already Existing Email 
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, field: "email", message: "Email already exists" });
    }

    //Already Existing number
    const existingUserByNumber = await User.findOne({ number });
    if (existingUserByNumber) {
      return res.status(400).json({ success: false,  field: "number", message: "Number already exists" });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user
    const newUser = new User({
      name,
      email,
      number,
      password: hashedPassword,
    });

   
    await newUser.save();
    
    generateTokenAndSetCookie(newUser._id, res); //generate cookie

    const today = formatDateDash(new Date());
    
    const newDashboard = new Dashboard({
      user: newUser._id,
      datewise: {
        [today]: { date: today, clickCount: 0 }, 
      },
    });

    
    await newDashboard.save();
    
    res.status(201).json({
      success: true,
      message: "Account created successfully. Please login to continue.",
      use: newUser
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


//login function
export async function login (req, res) {
  try {
		const { email, password } = req.body; 

    //Find Email
		const user = await User.findOne({ email: email });  
		if (!user) {
			return res.status(404).json({ success: false,field: "cred", message: "Invalid credentials" });
		}

    //Match Password
		const isPasswordCorrect = await bcryptjs.compare(password, user.password); 

		if (!isPasswordCorrect) {
			return res.status(400).json({ success: false,field: "cred", message: "Invalid credentials" });
		}

		//Generate Cookie
    generateTokenAndSetCookie(user._id, res); 

		res.status(200).json({ 
			success: true,
			user: {
				...user._doc,
				password: "", 
			},
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

//logout function
export async function logout (req, res) {
  try {
		 //clear cookie
    res.clearCookie("jwt-linkshort");
		res.status(200).json({ success: true, message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}

//authCheck
export async function authCheck(req, res) {
	try {
		
		res.status(200).json({ success: true, user: req.user });
	} catch (error) {
		console.log("Error in authCheck controller", error.message);
		res.status(500).json({ success: false, message: "Internal server error" });
	}
}


