"use client";

import Image from "next/image";
import { updateGuest } from "../_lib/actions";
import SubmitButton from "./SubmitButton";

function UpdateProfileForm({ guest, children }) {
  const { fullName, nationality, nationalID, email, countryFlag } = guest;

  return (
    <form
      action={updateGuest}
      className="bg-primary-900 py-6 sm:py-8 px-4 sm:px-8 lg:px-12 text-sm sm:text-base lg:text-lg flex gap-4 sm:gap-6 flex-col rounded-lg sm:rounded-none"
    >
      <div className="space-y-2">
        <label className="block font-medium">Full name</label>
        <input
          name="fullName"
          defaultValue={fullName}
          disabled
          className="px-3 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Email address</label>
        <input
          name="email"
          defaultValue={email}
          disabled
          className="px-3 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400 text-sm sm:text-base"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="nationality" className="font-medium">
            Where are you from?
          </label>
          <div className="relative w-5 sm:w-6 aspect-square">
            <Image
              src={countryFlag}
              fill
              alt="Country flag"
              className="rounded-sm object-cover"
            />
          </div>
        </div>
        {children}
      </div>

      <div className="space-y-2">
        <label htmlFor="nationalID" className="block font-medium">
          National ID number
        </label>
        <input
          name="nationalID"
          defaultValue={nationalID}
          className="px-3 sm:px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end items-center gap-4 sm:gap-6 pt-2">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;
