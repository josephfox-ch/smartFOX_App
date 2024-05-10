import React from "react";
import Breadcrumb from "../../components/Breadcrumb";
import PersonalInformationForm from "../../components/forms/PersonalInformationForm";
import AvatarEditForm from "../../components/forms/AvatarEditForm";

const AccountSettingsPage = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb className="text-foxColor" pageName="Account Settings" />
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        <div className="col-span-1 xl:col-span-2 order-1 xl:order-2 ">
          <AvatarEditForm />
        </div>
        <div className="col-span-1 xl:col-span-3 order-2 xl:order-1 ">
          <PersonalInformationForm />
        </div>
      </div>
    </div>
  );
};

export default AccountSettingsPage;
