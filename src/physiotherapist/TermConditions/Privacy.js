import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getContentApi } from "../../redux/UserReducerApis";
//component
import Header from "../../mainLayout/Header/Header";
import Footer from "../../mainLayout/Footer/Footer";
import "./TermConditions.scss";
function Privacy() {
  const dispatch = useDispatch();
  const primayColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.primaryColor);
  const secondaryColorRedux = useSelector((state) => state?.userReducer?.getApiContentData?.data[1]?.secondaryColor);

  const [primaryColor, setPrimary] = useState();
  const [secondaryColor, setSecondary] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    dispatch(getContentApi());

    setPrimary(primayColorRedux);
    setSecondary(secondaryColorRedux);
  }, [primayColorRedux]);

  return (
    <>
      <Header />
      <div className="termDiv">
        <h6 className="h6tag" style={{ color: primaryColor }}>
          1. Important information and who we are
        </h6>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          Purpose of this privacy notice
        </h6>
        <p className="ptag">
          This privacy notice aims to give you information on how <span className="key-text">PHYSIOQ LIMITED</span>{" "}
          collect and processes your personal data through your use of this platform, including any data you may provide
          through this platform when you accept to receive our newsletter <span className="key-text">OR</span> purchase
          a product or service <span className="key-text">OR</span> take part in a competition. This website is not
          intended for children and we do not knowingly collect data relating to children.
          <br />
          It is important that you read this privacy notice together with any other privacy notice or fair processing
          policy we may provide on specific occasions when we are collecting or processing personal data about you so
          that you are fully aware of how and why we are using your data. This privacy notice supplements other notices
          and privacy policies and is not intended to override them. <br />
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          Controller
        </h6>
        <p className="ptag">
          <span className="key-text">PHYSIOQ LIMITED</span> (HE 373578) is the controller and responsible for your
          personal data (collectively referred to as "we", "us" or "our" in this privacy notice).
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          Contact details
        </h6>
        <p className="ptag">
          If you have any questions about this privacy notice or our privacy practices, please contact us as per the
          contact details on the site.
          <br />
          You have the right to make a complaint at any time to the supervisory authority in Cyprus, the Office of the
          Commissioner for Personal Data Protection (www.dataprotection.gov.cy). For more information concerning the
          process of filing a complaint please visit the Commissioner’s website.
        </p>{" "}
        <h6 className="h6tag" style={{ color: primaryColor }}>
          Changes to the privacy notice and your duty to inform us of changes
        </h6>
        <p className="ptag">
          We keep our privacy notice under regular review. It may change and if it does, the new privacy notice will be
          posted on our website.
          <br />
          It is important that the personal data we hold about you is accurate and current. Please keep us informed if
          your personal data changes during your relationship with us.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          Third-party links
        </h6>
        <p className="ptag">
          This website may include links to third-party websites, plug-ins and applications. Clicking on those links or
          enabling those connections may allow third parties to collect or share data about you. We do not control these
          third-party websites and are not responsible for their privacy statements. When you leave our website, we
          encourage you to read the privacy notice of every website you visit.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          2. The data we collect about you
        </h6>
        <p className="ptag">
          Personal data, or personal information, means any information about an individual from which that person can
          be identified. It does not include data where the identity has been removed (anonymous data). <br />
          We may collect, use, store and transfer different kinds of personal data about you which we have grouped
          together as follows: <br />• Identity Data includes first name, maiden name, last name, username or similar
          identifier, Identity Card No./Passport No. marital status, title, date of birth and gender. • Contact Data
          includes billing address, delivery address, email address and telephone numbers. <br />• Financial Data
          includes bank account and payment card details. <br />• Transaction Data includes details about payments to
          and from you and other details of products and services you have purchased from us. <br />• Technical Data
          includes internet protocol (<span className="key-text">IP</span>) address, your login data, browser type and version, time zone setting and
          location, browser plug-in types and versions, operating system and platform, and other technology on the
          devices you use to access the Rehub platform. <br />• Profile Data includes your username and password,
          purchases or orders made by you, your interests, preferences, feedback and survey responses. <br />• Usage
          Data includes information about how you use our website, products and services. <br />• Marketing and
          Communications Data includes your preferences in receiving marketing from us and our third parties and your
          communication preferences. <br />
          We also collect, use and share Aggregated Data such as statistical or demographic data for any purpose.
          Aggregated Data could be derived from your personal data but is not considered personal data in law as this
          data will not directly or indirectly reveal your identity. For example, we may aggregate your Usage Data to
          calculate the percentage of users accessing a specific website feature. However, if we combine or connect
          Aggregated Data with your personal data so that it can directly or indirectly identify you, we treat the
          combined data as personal data which will be used in accordance with this privacy notice. <br />
          We do not collect any Special Categories of Personal Data about you (this includes details about your race or
          ethnicity, religious or philosophical beliefs, sex life, sexual orientation, political opinions, trade union
          membership, information about your health, and genetic and biometric data). Nor do we collect any information
          about criminal convictions and offences. <br />
          If you fail to provide personal data <br />
          Where we need to collect personal data by law, or under the terms of a contract we have with you, and you fail
          to provide that data when requested, we may not be able to perform the contract we have or are trying to enter
          into with you (for example, to provide you with goods or services). In this case, we may have to cancel a
          product or service you have with us but we will notify you if this is the case at the time.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          3. How is your personal data collected?
        </h6>
        <p className="ptag">
          We use different methods to collect data from and about you including through:
          <br />
          • Direct interactions. You may give us your Identity, Contact and Financial Data by filling in forms or by
          corresponding with us by post, phone, email or otherwise. This includes personal data you provide when you :
          <br />
          • apply for our products or services through our platform;
          <br />
          • create an account on our platform;
          <br />• subscribe to our service or publications; <br />• request marketing to be sent to you; <br />
          • enter a competition, promotion or survey; or
          <br />• give us feedback or contact us. <br />• Third parties or publicly available sources. We will receive
          personal data about you from various third parties and public sources. <br />
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          4. How we use your Personal Data
        </h6>
        <p className="ptag">
          We will only use your personal data when the law allows us to. Most commonly, we will use your personal data
          in the following circumstances: <br />• Where we need to perform the contract we are about to enter into or
          have entered into with you. <br />• To help us make your Centre booking and provide the services you request
          in relation to the Rehabilitation Centre, <br />• To provide users with the information needed to conclude the
          contract Host and Pro. <br />• Where it is necessary for our legitimate interests (or those of a third party)
          and your interests and fundamental rights do not override those interests. <br />• Where we need to comply
          with a legal obligation <br />
          We may also use your personal information in the following situations, which are likely to be rare: <br />•
          Where we need to protect your interests or someone else’s interests. <br />• Where it is needed in the public
          interest or for official purposes <br />
          Technical Data from the following parties: <br />
          (a) analytics providers; <br />
          (b) advertising networks ; and <br />
          (c) search information providers. <br />• Contact, Financial and Transaction Data from providers of technical,
          payment and delivery services. <br />• Identity and Contact Data from data brokers or aggregators. <br />•
          Identity and Contact Data from publicly available sources. <br />
          Generally, we do not rely on consent as a legal basis for processing your personal data although we will get
          your consent before sending third party direct marketing communications to you via email or text message. You
          have the right to withdraw consent to marketing at any time by contacting us. Purposes for which we will use
          your personal data <br />
          We have set out below, in a table format, a description of all the ways we plan to use your personal data, and
          which of the legal bases we rely on to do so. We have also identified what our legitimate interests are where
          appropriate.
          <br />
          Note that we may process your personal data for more than one lawful ground depending on the specific purpose
          for which we are using your data. Please contact us if you need details about the specific legal ground we are
          relying on to process your personal data where more than one ground has been set out in the table below.
          Change of purpose <br />
          We will only use your personal data for the purposes for which we collected it, unless we reasonably consider
          that we need to use it for another reason and that reason is compatible with the original purpose. If you wish
          to get an explanation as to how the processing for the new purpose is compatible with the original purpose,
          please contact us. If we need to use your personal data for an unrelated purpose, we will notify you and we
          will explain the legal basis which allows us to do so.
          <br />
          Please note that we may process your personal data without your knowledge or consent, in compliance with the
          above rules, where this is required or permitted by law.
          <br />
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          5. Disclosures of your personal data
        </h6>
        <p className="ptag">
          We may share your personal data with the parties set out below for the purposes set out in the table Purposes
          for which we will use your personal data above. <br />• Internal Third Parties as set out in the Glossary.{" "}
          <br />• External Third Parties as set out in the Glossary. <br />• Third parties to whom we may choose to
          sell, transfer or merge parts of our business or our assets. Alternatively, we may seek to acquire other
          businesses or merge with them. If a change happens to our business, then the new owners may use your personal
          data in the same way as set out in this privacy notice. <br />
          We require all third parties to respect the security of your personal data and to treat it in accordance with
          the law. We do not allow our third-party service providers to use your personal data for their own purposes
          and only permit them to process your personal data for specified purposes and in accordance with our
          instructions. <br />
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          6. International transfers
        </h6>
        <p className="ptag">We do not transfer your personal data outside European Economic Area (<span className="key-text">EEA</span>).</p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          7. Data security
        </h6>
        <p className="ptag">
          We have put in place appropriate security measures to prevent your personal data from being accidentally lost,
          used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal
          data to those employees, agents, contractors and other third parties who have a business need to know. They
          will only process your personal data on our instructions, and they are subject to a duty of confidentiality.{" "}
          <br />
          We have put in place procedures to deal with any suspected personal data breach and will notify you and any
          applicable regulator of a breach where we are legally required to do so. <br />
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          8. Data retention
        </h6>
        <p className="ptag">
          How long will you use my personal data for?
          <br />
          We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected
          it for, including for the purposes of satisfying any legal, regulatory, tax, accounting or reporting
          requirements. We may retain your personal data for a longer period in the event of a complaint or if we
          reasonably believe there is a prospect of litigation in respect to our relationship with you.
          <br />
          To determine the appropriate retention period for personal data, we consider the amount, nature and
          sensitivity of the personal data, the potential risk of harm from unauthorised use or disclosure of your
          personal data, the purposes for which we process your personal data and whether we can achieve those purposes
          through other means, and the applicable legal, regulatory, tax, accounting or other requirements.
          <br />
          By law we have to keep basic information about our customers (including Contact, Identity, Financial and
          Transaction Data) after they cease being customers for tax purposes.
          <br />
          In some circumstances you can ask us to delete your data: see your legal rights below for further information.
          <br />
          In some circumstances we will anonymise your personal data (so that it can no longer be associated with you)
          for research or statistical purposes, in which case we may use this information indefinitely without further
          notice to you. <br />
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          9. Your legal rights
        </h6>
        <p className="ptag">
          Under certain circumstances, you have rights under data protection laws in relation to your personal data.
          Please read below to find out more about these rights: <br />
          • Request access to your personal data.
          <br />
          • Request correction of your personal data.
          <br />
          • Request erasure of your personal data.
          <br />
          • Object to processing of your personal data.
          <br />
          • Request restriction of processing your personal data.
          <br />
          • Request transfer of your personal data.
          <br />
          • Right to withdraw consent.
          <br />
          If you wish to exercise any of the rights set out above, please contact us.
          <br />
          Right to deny
          <br />
          Please note that in case you ask us to erase the personal information concerning you, we reserve the right to
          deny the erasure, if the processing is necessary for compliance with a legal obligation, for the performance
          of a task carried out in the public interest or for establishment, exercise or defence of legal claims.
          <br />
          No fee usually required
          <br />
          You will not have to pay a fee to access your personal data (or to exercise any of the other rights). However,
          we may charge a reasonable fee if your request is clearly unfounded, repetitive or excessive. Alternatively,
          we could refuse to comply with your request in these circumstances.
          <br />
          What we may need from you
          <br />
          We may need to request specific information from you to help us confirm your identity and ensure your right to
          access your personal data (or to exercise any of your other rights). This is a security measure to ensure that
          personal data is not disclosed to any person who has no right to receive it. We may also contact you to ask
          you for further information in relation to your request to speed up our response.
          <br />
          Time limit to respond
          <br />
          We try to respond to all legitimate requests within one month. Occasionally it could take us longer than a
          month if your request is particularly complex or you have made a number of requests. In this case, we will
          notify you and keep you updated. <br />
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          10. Glossary
        </h6>
        <p className="ptag">
          <span className="my-3 block key-text">LAWFUL BASIS</span>
          Legitimate Interest means the interest of our business in conducting and managing our business to enable us to
          give you the best service/product and the best and most secure experience. We make sure we consider and
          balance any potential impact on you (both positive and negative) and your rights before we process your
          personal data for our legitimate interests. We do not use your personal data for activities where our
          interests are overridden by the impact on you (unless we have your consent or are otherwise required or
          permitted to by law). You can obtain further information about how we assess our legitimate interests against
          any potential impact on you in respect of specific activities by contacting us.
          <br />
          Performance of Contract means processing your data where it is necessary for the performance of a contract to
          which you are a party or to take steps at your request before entering into such a contract.
          <br />
          Comply with a legal obligation means processing your personal data where it is necessary for compliance with a
          legal obligation that we are subject to.
          <br />
          <span className="my-3 block key-text">THIRD PARTIES</span>
          Internal Third Parties
          <br />
          Other companies in the Company’s Group acting as joint controllers or processors and who are based in Cyprus
          and provide booking services. <br />
          External Third Parties
          <br />
          • Service providers acting as processors based in Cyprus who provide <span className="key-text">IT</span> and system administration services.
          <br />
          • Professional advisers acting as processors or joint controllers including lawyers, bankers, auditors and
          insurers based in Cyprus who provide consultancy, banking, legal, insurance and accounting services.
          <br />
          • Revenue & Customs, regulators and other authorities acting as processors or joint controllers-based Cyprus
          who require reporting of processing activities in certain circumstances.
          <br />
          <span className="my-3 block key-text">YOUR LEGAL RIGHTS</span>
          You have the right to:
          <br />
          Request access to your personal data (commonly known as a "data subject access request"). This enables you to
          receive a copy of the personal data we hold about you and to check that we are lawfully processing it.
          <br />
          Request correction of the personal data that we hold about you. This enables you to have any incomplete or
          inaccurate data we hold about you corrected, though we may need to verify the accuracy of the new data you
          provide to us.
          <br />
          Request erasure of your personal data. This enables you to ask us to delete or remove personal data where
          there is no good reason for us continuing to process it. You also have the right to ask us to delete or remove
          your personal data where you have successfully exercised your right to object to processing (see below), where
          we may have processed your information unlawfully or where we are required to erase your personal data to
          comply with local law. Note, however, that we may not always be able to comply with your request of erasure
          for specific legal reasons which will be notified to you, if applicable, at the time of your request. <br />
          Object to processing of your personal data where we are relying on a legitimate interest (or those of a third
          party) and there is something about your particular situation which makes you want to object to processing on
          this ground as you feel it impacts on your fundamental rights and freedoms. You also have the right to object
          where we are processing your personal data for direct marketing purposes. In some cases, we may demonstrate
          that we have compelling legitimate grounds to process your information which override your rights and
          freedoms.
          <br />
          Request restriction of processing of your personal data. This enables you to ask us to suspend the processing
          of your personal data in the following scenarios: <br />
          • If you want us to establish the data's accuracy.
          <br />
          • Where our use of the data is unlawful but you do not want us to erase it.
          <br />• Where you need us to hold the data even if we no longer require it as you need it to establish,
          exercise or defend legal claims. <br />• You have objected to our use of your data but we need to verify
          whether we have overriding legitimate grounds to use it. <br />
          Request the transfer of your personal data to you or to a third party. We will provide to you, or a third
          party you have chosen, your personal data in a structured, commonly used, machine-readable format. Note that
          this right only applies to automated information which you initially provided consent for us to use or where
          we used the information to perform a contract with you. <br />
          Withdraw consent at any time where we are relying on consent to process your personal data. However, this will
          not affect the lawfulness of any processing carried out before you withdraw your consent. If you withdraw your
          consent, we may not be able to provide certain products or services to you. We will advise you if this is the
          case at the time you withdraw your consent.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;
