import Breadcrumb from "../components/Breadcrumb";
import PersonalInformationForm from "../components/forms/PersonalInformationForm";
import PhotoUploadForm from "../components/forms/PhotoUploadForm";
import { useUser } from "../context/UserContext";


const AccountSettings = () => {
  const { user } = useUser();
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb className="text-foxColor" pageName="Account Settings" />

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
        {/* Personal Information Form */}
        <div className="col-span-1 xl:col-span-3 order-2 xl:order-1">
          <PersonalInformationForm />
        </div>

        {/* Photo Section */}
        <div className="col-span-1 xl:col-span-2 order-1 xl:order-2">
          <PhotoUploadForm />
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
