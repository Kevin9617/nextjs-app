'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PAGE_SIZE = 10;

const TableData = ({ search, filter, page, onTotalChange }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    setLoading(true);
    const query = new URLSearchParams({
      page,
      pageSize: PAGE_SIZE,
      search,
      sort: filter === 'Old Review' ? 'old' : 'recent',
    });
    try {
      const res = await fetch(`/api/my-properties?${query.toString()}`);
      const data = await res.json();
      let items = [];
      if (Array.isArray(data.properties)) {
        items = data.properties;
      } else if (typeof data.properties === 'object' && data.properties !== null) {
        items = [data.properties];
      }
      setProperties(items);
      onTotalChange(data.total || 0);
    } catch (err) {
      setProperties([]);
      onTotalChange(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [search, filter, page]);

  let theadConent = [
    "Listing Title",
    "Date published",
    "Status",
    "Action",
  ];
  let tbodyContent = properties.map((item) => (
    <tr key={item.id}
        style={{ cursor: 'pointer' }}
        onClick={() => router.push(`/listing-details-v2/${item.id}`)}
        onMouseOver={e => e.currentTarget.style.background = '#f5f5f5'}
        onMouseOut={e => e.currentTarget.style.background = ''}
    >
      <td scope="row">
        <div className="feat_property list favorite_page style2">
          <div className="thumb">
            <Image
              width={150}
              height={220}
              className="img-whp cover"
              src={item.media_image1 ? `/api/image?filename=${item.media_image1}` : "/assets/images/property/default.jpg"}
              alt={item.title || "property"}
            />
            <div className="thmb_cntnt">
              <ul className="tag mb0">
                <li className="list-inline-item">
                  <a href="#">For Rent</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="details">
            <div className="tc_content">
              <h4>{item.propertyTitle || item.title}</h4>
              <p>
                <span className="flaticon-placeholder"></span>
                {item.address || item.location}
              </p>
              <a className="fp_price text-thm" href="#">
                ${item.price}
                <small>/mo</small>
              </a>
            </div>
          </div>
        </div>
      </td>
      <td>{item.created_at ? new Date(item.created_at).toLocaleDateString() : "-"}</td>
      <td>
        <span className={`status_tag badge ${item.status === 'active' ? 'badge-success' : 'badge-warning'}`}>{item.status}</span>
      </td>
      <td>
        <ul className="view_edit_delete_list mb0">
          <li className="list-inline-item" data-toggle="tooltip" data-placement="top" title="Edit">
            <a href="#" onClick={e => { e.stopPropagation(); e.preventDefault(); router.push(`/create-listing?id=${item.id}`); }}>
              <span className="flaticon-edit"></span>
            </a>
          </li>
          <li className="list-inline-item" data-toggle="tooltip" data-placement="top" title="Delete">
            <a href="#">
              <span className="flaticon-garbage"></span>
            </a>
          </li>
        </ul>
      </td>
    </tr>
  ));

  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            {theadConent.map((value, i) => (
              <th scope="col" key={i}>
                {value}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={theadConent.length}>Loading...</td></tr>
          ) : (
            tbodyContent
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableData;
