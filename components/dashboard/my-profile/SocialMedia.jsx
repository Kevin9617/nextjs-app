'use client'
import { useState, useEffect } from 'react';

const SocialMedia = () => {
  const [skype, setSkype] = useState("");
  const [website, setWebsite] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [googlePlus, setGooglePlus] = useState("");
  const [youtube, setYoutube] = useState("");
  const [pinterest, setPinterest] = useState("");
  const [vimeo, setVimeo] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchSocial() {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) return;
      try {
        const res = await fetch('/api/social-media', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setSkype(data.skype || "");
          setWebsite(data.website || "");
          setFacebook(data.facebook || "");
          setTwitter(data.twitter || "");
          setLinkedin(data.linkedin || "");
          setInstagram(data.instagram || "");
          setGooglePlus(data.google_plus || "");
          setYoutube(data.youtube || "");
          setPinterest(data.pinterest || "");
          setVimeo(data.vimeo || "");
        }
      } catch {}
    }
    fetchSocial();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    setMessage("");
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setMessage("Not authenticated");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch('/api/social-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          skype, website, facebook, twitter, linkedin, instagram, google_plus: googlePlus, youtube, pinterest, vimeo
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage("Social media updated successfully!");
      } else {
        setMessage(data.error || "Failed to update social media");
      }
    } catch (err) {
      setMessage("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="row">
      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleSkype">Skype</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleSkype"
            placeholder="alitfn"
            value={skype}
            onChange={e => setSkype(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleWebsite">Website</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleWebsite"
            placeholder="creativelayers@gmail.com"
            value={website}
            onChange={e => setWebsite(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleFaceBook">Facebook</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleFaceBook"
            value={facebook}
            onChange={e => setFacebook(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleTwitter">Twitter</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleTwitter"
            value={twitter}
            onChange={e => setTwitter(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleLinkedin">Linkedin</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleLinkedin"
            value={linkedin}
            onChange={e => setLinkedin(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleInstagram">Instagram</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInstagram"
            value={instagram}
            onChange={e => setInstagram(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleGooglePlus">Google Plus</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleGooglePlus"
            value={googlePlus}
            onChange={e => setGooglePlus(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleYoutube">Youtube</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleYoutube"
            value={youtube}
            onChange={e => setYoutube(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExamplePinterest">Pinterest</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExamplePinterest"
            value={pinterest}
            onChange={e => setPinterest(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-lg-6 col-xl-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="formGroupExampleVimeo">Vimeo</label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleVimeo"
            value={vimeo}
            onChange={e => setVimeo(e.target.value)}
          />
        </div>
      </div>
      {/* End .col */}

      <div className="col-xl-12 text-right">
        <div className="my_profile_setting_input">
          <button className="btn btn2" type="button" onClick={handleUpdate} disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
      {/* End .col */}
      {message && (
        <div className="col-xl-12">
          <div className="alert alert-info mt-3 text-center">{message}</div>
        </div>
      )}
    </div>
  );
};

export default SocialMedia;
