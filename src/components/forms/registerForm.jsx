import { Form, useNavigate } from "react-router-dom";
import ListOfDepartments from "./listOfDepartments";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "../../actions/registerAction";

const schema = yup.object().shape({
	firstName: yup.string().required(),
	lastName: yup.string().required(),
	email: yup.string().required().email(),
	phone: yup.string().required().min(10).max(10),
	userName: yup.string().required(),
	password: yup.string().required().min(8),
	//role: yup.string(),
	// departments: yup.array().required(), //objct id here
	// lastLoggedIn: yup.date(),
	// isActive: yup.boolean(),
	// updatedBy: yup.string(),
	// updatedAt: yup.date(),
});

function RegisterForm() {
	let selectedDP = [];
	
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({ resolver: yupResolver(schema) });

	const handleChange = (value) => {
		selectedDP = value;
	};
	const onSubmitHandler = (data) => {
		data["departments"] = selectedDP;
	

		console.log("Data collected from Form : ", data);
		dispatch(registerUser(data));
		navigate("/login");
	};
	return (
		// <>
		// 	<Form onSubmit={handleSubmit(onSubmitHandler)}>
		// 		<input type={"text"} {...register("name")} />
		// 		<button type="submit" onClick={() => console.log("demo")}>
		// 			Demo
		// 		</button>
		// 	</Form>
		// </>
		<>
			{/* onSubmit={handleSubmit(onSubmitHandler)} */}
			<Form
				onSubmit={handleSubmit(onSubmitHandler)}
				className="text-orange-600 font-bold shadow-lg  p-3 backdrop-blur rounded"
			>
				<div className="flex justify-between">
					<div className="">
						<label htmlFor="fname" className="form-label">
							First Name*
						</label>
						<input
							{...register("firstName")}
							id="fname"
							type="text"
							className="form-control border p-1"
							placeholder="e.g Cersei"
						></input>
					</div>
					<div className="">
						<label htmlFor="lname" className="form-label">
							Last Name*
						</label>
						<input
							id="lname"
							type="text"
							className="form-control border p-1"
							placeholder="e.g Lannister"
							{...register("lastName")}
						></input>
					</div>
				</div>
				<div className="flex justify-between">
					<div className="">
						<label htmlFor="em" className="form-label">
							email*
						</label>
						<input
							id="em"
							type="email"
							className="form-control border p-1"
							placeholder="e.g abc@xyz.com"
							{...register("email")}
						></input>
					</div>
					<div className="">
						<label htmlFor="phno" className="form-label">
							Phone*
						</label>
						<input
							id="phno"
							type="text"
							className="form-control border p-1"
							placeholder="e.g 8888888888"
							{...register("phone")}
						></input>
					</div>
				</div>

				<div className="justify-center">
					<label htmlFor="dep" className="form-label">
						Department(s)
					</label>

					<div className="w-full bg-white text-black font-none">
						<ListOfDepartments onHandleChange={handleChange} />
					</div>
				</div>
				<div className="flex gap-2">
					<div className="">
						<label htmlFor="uname" className="form-label">
							Username*
						</label>
						<input
							type="text"
							className="form-control"
							id="uname"
							placeholder="e.g cersei99"
							{...register("userName")}
						/>
					</div>
					<div className="">
						<label htmlFor="upass" className="form-label">
							Password*
						</label>
						<input
							type="password"
							className="form-control"
							id="upass"
							placeholder="e.g ***********"
							{...register("password")}
						/>
					</div>
				</div>
				<button
					className="mt-4 text-white p-2 w-full rounded bg-orange-400"
					type="submit"
				>
					Sign up
				</button>
			</Form>
		</>
	);
}

export default RegisterForm;
