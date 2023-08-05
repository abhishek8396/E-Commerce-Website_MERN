import React from "react";
import Layout from "../Component/Layout/Layout";
const Policy = () => {
  return (
    <Layout title={'Policy'}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="Image/Policies.jpg"
            alt="Policies us"
            style={{ width: "80%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            A privacy policy (also referred to as a privacy notice) is a
            statement or legal document that describes how a company, website,
            or app collects, uses, maintains, and shares information collected
            from or about its users. Most countries require any website that
            collects personal information from its users to have a written
            privacy policy posted on the website. Does Termly's Privacy Policy
            Generator cover all privacy laws? Termly’s Privacy Policy Generator
            is designed to help you comply with the following: EU General Data
            Protection Regulation (GDPR) UK GDPR California Consumer Privacy Act
            (CCPA) CalOPPA PIPEDA In many cases, our Privacy Policy Generator
            could help you comply with other privacy laws. However, Termly’s
            products aren’t specifically built to comply with laws outside of
            the above list. We recommend consulting with a local attorney for
            any laws not yet specifically included in our offerings. Click here
            to learn more about which privacy laws Termly's Privacy Policy
            Generator covers.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
