import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { StudentFormData } from "../types/types";
import axios from "axios";

const RegisterUser: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormData>();

  const onSubmit: SubmitHandler<StudentFormData> = async (data) => {
    // create a instance of formData for sending your form details
    const formData = new FormData();

    // append the text files
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("address", data.address);

    // append the image files
    if (data.phone && data.photo?.length) {
      formData.append("photo", data.photo[0]);
    }

    // now make the post request
    try {
      const response = await axios.post(
        "http://localhost:3000/api/create-student",
        formData,
        { method: "POST" }
      );
      if (response.status === 201) {
        console.log("student register successfull");
      }
    } catch (err) {
      console.log(err);
    }

    console.log("Form Data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Register Student
        </h2>

        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Name is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <input
            type="text"
            id="age"
            {...register("age", {
              required: "Age is required",
              valueAsNumber: true,
              min: { value: 1, message: "Age must be at least 1" },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Phone must be a valid number",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email must be valid",
              },
            })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <textarea
            id="address"
            {...register("address", { required: "Address is required" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="profilePic"
            className="block text-sm font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <input
            type="file"
            id="profilePic"
            {...register("photo", {
              required: "Profile picture is required",
              validate: (value) =>
                (value && value.length > 0) || "File is required",
            })}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            accept="image/*"
          />
          {errors.photo && (
            <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegisterUser;
