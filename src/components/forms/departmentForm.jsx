import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "semantic-ui-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	addDepartment,
	updateDepartment,
} from "../../actions/departmentAction";
import { useEffect } from "react";
import { Alert } from "@mui/material";

const schema = yup.object().shape({
	name: yup.string().min(3).required(),
	departmentCode: yup.string().min(4).max(4).required(),
});

function DepartmentForm(props) {
	const { selectedDepartment, handleDepSearch } = props;
	const departmentId = selectedDepartment._id;

	const dispatch = useDispatch();
	const departments = useSelector(
		(state) => state.departmentReducer.departments
	);

	const onSubmitHandler = (data) => {
		if (data._id) {
			dispatch(updateDepartment(data));
			console.log("update department");
		} else {
			dispatch(addDepartment(data));
			console.log("added department");
		}
	};

	useEffect(() => {
		if (!departmentId) return;
		const department = departments.find((d) => d._id === departmentId);
		setValue("name", department.name);
		setValue("departmentCode", department.departmentCode);
		setValue("_id", department._id);
	}, departmentId);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({ resolver: yupResolver(schema) });

	return (
		<body className="">
			<h6 className="">Add or Search Department</h6>
			<Form onSubmit={handleSubmit(onSubmitHandler)} className="p-3 shadow">
				<div className="flex">
					<div className="flex flex-wrap gap-4">
						<div className="w-[50%] mt-3">
							<label htmlFor="name" className="form-label ">
								Department Name*
							</label>
							<input
								type="text"
								className="form-control outline outline-2 outline-orange-400"
								placeholder="Enter/Search department name"
								id="name"
								{...register("name")}
								onChange={handleDepSearch}
							/>
							{errors.name ? (
								<Alert severity="error">{errors.name?.message}</Alert>
							) : null}
						</div>

						<div className="w-[50%] ">
							<label htmlFor="code" className="form-label ">
								Department code*
							</label>
							<input
								type="text"
								className="form-control outline outline-2 outline-orange-400"
								placeholder="Enter department code"
								id="code"
								{...register("departmentCode")}
							/>
							{errors.departmentCode ? (
								<Alert severity="error">{errors.departmentCode?.message}</Alert>
							) : null}
						</div>
						<div className="relative bottom-[12%] left-[10%]">
							<button
								type="submit"
								className=" pr-4 pl-1 py-1  rounded-full bg-orange-300"
							>
								<div className="flex gap-2 items-center">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.0"
										stroke="currentColor"
										className="w-[30px]"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									Add Department
								</div>
							</button>
						</div>
					</div>
				</div>
			</Form>
		</body>
	);
}

export default DepartmentForm;
