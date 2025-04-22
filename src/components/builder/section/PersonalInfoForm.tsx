// import { useAtom } from "jotai";
// import { personalInfoAtom } from "../atoms/personalInfoAtom";
// import { TextField, Typography, Box } from "@mui/material";

// export default function PersonalInfoForm() {
//   const [personalInfo, setPersonalInfo] = useAtom(personalInfoAtom);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setPersonalInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <Box mb={4}>
//       <Typography variant="h6" gutterBottom>
//         Personal Information
//       </Typography>
//       <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
//         <TextField
//           label="Full Name"
//           name="name"
//           value={personalInfo.name}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           label="Email"
//           name="email"
//           value={personalInfo.email}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           label="Phone"
//           name="phone"
//           value={personalInfo.phone}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           label="LinkedIn"
//           name="linkedin"
//           value={personalInfo.linkedin}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           label="City"
//           name="city"
//           value={personalInfo.city}
//           onChange={handleChange}
//           fullWidth
//         />
//         <TextField
//           label="State"
//           name="state"
//           value={personalInfo.state}
//           onChange={handleChange}
//           fullWidth
//         />
//       </Box>
//     </Box>
//   );
// }
