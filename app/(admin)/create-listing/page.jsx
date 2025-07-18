export const dynamic = "force-dynamic";

import CreateListing from "@/components/dashboard/create-listing";
import { Suspense } from "react";

export const metadata = {
  title: "Create Listing || FindHouse - Real Estate React Template",
  description: "FindHouse - Real Estate React Template",
};

const index = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateListing />
    </Suspense>
  );
};

export default index;
