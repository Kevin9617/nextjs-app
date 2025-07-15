import ContactWithAgent from "../common/agent-view/ContactWithAgent";
import ListingCreator from "../common/listing/ListingCreator";

const Sidebar = () => {
  return (
    <>
      <div className="sidebar_listing_list">
        <div className="sidebar_advanced_search_widget">
          <div className="sl_creator">
            <h4 className="mb25">Listed By</h4>
            <ListingCreator />
          </div>
          {/* End .sl_creator */}
          <ContactWithAgent />
        </div>
      </div>
      {/* End .sidebar_listing_list */}
    </>
  );
};

export default Sidebar;
