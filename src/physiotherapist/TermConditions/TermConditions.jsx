import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getContentApi } from "../../redux/UserReducerApis";
//component
import Header from "../../mainLayout/Header/Header";
import Footer from "../../mainLayout/Footer/Footer";
import "./TermConditions.scss";

function TermConditions() {
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
          Your attention is particularly drawn to the provisions of clause 4 (Disclaimer and Limitation of liability).{" "}
        </h6>
        <p className="ptag" style={{ marginTop: "1em" }}>
          Thank you for vising www.rehubcy.com (the Platform). By accessing and using this Platform and/or the services
          provided through the Platform, you agree to these Terms of Use (the ‘Terms of Use’). If you do not agree, you
          may not use this Platform or the services provided through this Platform.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          USE OF THIS PLATFORM AND ACCEPTANCE OF TERMS
        </h6>
        <p className="ptag">
          {" "}
          Please carefully review the Terms of Use of this Platform and the terms of our Privacy Policy on this site
          before using this Platform, or any goods or services related to our Platform. These Terms of Use contain
          important information regarding your legal rights, remedies and obligations. They include various limitations
          and exclusions. By using this Platform, you agree to be bound by, and acknowledge your acceptance of these
          Terms of Use.
        </p>
        <p className="ptag">
          {" "}
          If you do not agree to these Terms of Use, or if you do not agree with our Privacy Policy, please do not use
          the Platform or any services offered through the Platform. By clicking “
          <span className="key-text">I ACCEPT</span>” or by downloading, installing, or otherwise accessing or using the
          services, you agree that you have read and understood, and, as a condition to your use of the services, you
          agree to be bound by, the following Terms of Use, including our privacy policy (together, these “terms”).
        </p>{" "}
        <p className="ptag">
          {" "}
          If you are not eligible, or do not agree to the terms, then you do not have our permission to use the
          services. Your use of the services, and our provision of the services to you, constitutes an agreement by
          platform and by you to be bound by these Terms of Use.
        </p>
        <p className="ptag">
          ReHub Platform does not knowingly collect information from minors. Minors should not use this Platform.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          1. About us
        </h6>
        <p className="ptag">
          1.1 Company details. <span className="key-text">PHYSIOQ LIMITED</span>, a limited liability Company
          incorporated under the laws of the Republic of Cyprus with registration number{" "}
          <span className="key-text">HE 373578</span> (we or us) and having its registered office is at 59, Vyzantiou
          Str, Suite 101, Nicosia 2064, Cyprus. Our VAT number is 10373578Z.
          <br />
          1.2 We operate the Platform www.rehubcy.com (the Platform). <br />
          1.3 The Services means the services offered by us through the Platform (other than those services that are
          expressly governed by other terms), and mainly the use of the Platform by the following users (Users):
          <br />
          (a) Rehabilitation Center Owners (Hosts) to list Rehabilitation centres (Centres) for hosting of PROs (as
          defined in clause b below) for a space license (as defined below in clause 2), (each such listing is a Centre
          Listing).
          <br />
          (b) Licensed Freelance Rehabilitation Professionals who are interested in temporarily licensing space from
          Hosts (PROs), to search for Centre Listings and book Centres for space license (each such booking is a
          Booking).
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          2. Space License
        </h6>
        <p className="ptag">
          2.1 A Space License is not a lease but a temporary, limited license to enter, occupy, and use the Centre for
          the duration of the Booking. The Host retains the right to re-enter the Centre during your stay, to the
          extent:
          <br />
          (a) It is reasonably necessary,
          <br />
          (b) Permitted by the terms of your contract with the Host, and
          <br />
          (c) Consistent with applicable law
          <br />
          It is hereby stated that if you stay past the time booked, the Host has the right to make you leave in a
          manner consistent with applicable law, including by imposing reasonable overstay penalties. You may not exceed
          the maximum number of allowed Guests.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          3. Our entire contract with you
        </h6>
        <p className="ptag">
          3.1 These Terms of Use (Terms) apply to the supply of Services by us to you (Contract). They apply to the
          exclusion of any other terms that you seek to impose or incorporate, or which are implied by law, trade
          custom, practice, or course of dealing.
          <br />
          3.2 The Contract is the entire agreement between you and us in relation to its subject matter. You acknowledge
          that you have not relied on any statement, promise or representation or assurance or warranty that is not set
          out in the Contract.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          4. Our relationship with you – Disclaimer
        </h6>
        <p className="ptag">
          4.1 We do not own, create, sell, resell, provide, control, manage, offer, deliver, or supply any Centres or
          Centre Listings. Hosts alone are responsible for their Centres and Centre Listings.
          <br />
          4.2 We merely facilitate the Centre Booking process and ensure the fees for the Centre Booking are paid from
          the PRO to the Host, subject to the payment of our fees.
          <br />
          4.3 We are not and do not become a party to or other participant in any contractual relationship between
          Users. When a PRO makes a Centre Booking with a Host, itis directly with the Host.
          <br />
          4.4 Except as set out expressly in these Terms of Use, we make no warranties or representations, either
          express or implied, in relation to whole or any part of the Platform or Platform or any other matter relating
          to the Contract, including but without limitation: any warranties or conditions of title, usability,
          condition, operation, non-infringement of <span className="key-text">IP</span>, completeness, accuracy,
          satisfactory quality or fitness for a particular purpose.
          <br />
          4.5 We do not and cannot control the conduct of <span className="key-text">PROs</span>, Hosts or any persons
          related to them.
          <br />
          4.6 You acknowledge that we have the right, but not an obligation, to monitor the use of the Platform and
          review, disable access to, remove, or edit any content or Listings.
          <br />
          4.7 Information about Hosts, their premises (e.g. photographs, state licenses facilities), prices, and
          availability is based on what they provide to us.
          <br />
          4.8 The Hosts are responsible for making sure it’s accurate and up to date. We make no representations and
          give no warranties for the Booking of the Centre. We do not endorse or warrant the existence, conduct,
          performance, safety, quality, legality or suitability of any Centre, PRO, Host, or third-party.
          <br />
          4.9 If a dispute arises between Pros and Hosts we cannot and will not be involved and we will not have any
          responsibility in the relation to the dispute.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          5. Limitation of liability: YOUR ATTENTION IS DRAWN TO THIS CLAUSE.
        </h6>
        <p className="ptag">
          5.1 We exclude all implied conditions, warranties, representations or other terms that may apply to our
          Platform or any content on it.
          <br />
          5.2 We will not be liable to you for any loss or damage, whether in contract, tort (including negligence),
          breach of statutory duty, or otherwise, even if foreseeable, arising under or in connection with:
          <br />
          (a) use of, or inability to use, our Platform; or
          <br />
          (b) use of or reliance on any content displayed on our Platform.
          <br />
          (c) In particular, we will not be liable for:
          <br />
          (d) loss of profits, sales, business, or revenue;
          <br />
          (e) business interruption;
          <br />
          (f) loss of anticipated savings;
          <br />
          (g) loss of business opportunity, goodwill or reputation; or
          <br />
          (h) any indirect or consequential loss or damage. 5.3 Except for the obligation to transmit payments to Hosts
          under these Terms of Use, subject to the payment of our fees, our aggregate liability for any claim or dispute
          arising out of or in connection with these Terms of Use, your interaction with any{" "}
          <span className="key-text">Hosts</span> or <span className="key-text">PROs</span>, or your use of or inability
          to use the Platform, any Content, or any Services will not exceed:
          <br />
          (a) If a <span className="key-text">PRO</span>, the amount you paid as a <span className="key-text">PRO</span>{" "}
          for the Centre Booking giving rise to the liability,
          <br />
          (b) If a <span className="key-text">Hosts</span>, the amount paid to you as a{" "}
          <span className="key-text">Host</span> for the Centre Booking giving rise to the liability.
          <br />
          5.4 We have no liability for the use of the Centre any damage to the Centre or from using the Centre, the
          conduct of Hosts, PROs or third parties.
          <br />
          5.5 In no event will we be liable for any damages whatsoever, including but not limited to direct, indirect,
          incidental, punitive, and/or consequential damages (including without limitation those resulting from lost
          profits, lost data, stolen information or business interruption) arising out of the use, inability to use, or
          the results of use of this Platform, the services, any Centres linked to this Platform, the materials, content
          or information contained on any or all such Platforms, or the materials, content, products or services offered
          on this Platform or the services, whether based on warranty, contract, tort or any other legal theory and
          whether or not advised of the possibility of such damages.
          <br />
          5.6 In no event will we, or any other party involved in creating, producing, or delivering this Platform, the
          services or any materials or content offered through this Platform or the services be liable to you in any
          manner whatsoever for any action or non-action taken by you in reliance upon information provided through this
          Platform or the services. To the extent that applicable law may not allow the exclusion of incidental or
          consequential damages the above exclusion may not apply to you.
          <br />
          5.7 This clause 4 will survive termination of the Contract.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          6. Host Terms
        </h6>
        <p className="ptag">
          6.1 If you are a Host, you acknowledge and agree that:
          <br />
          (a) You are solely responsible for the form, content and accuracy of any Centre Listing you post or material
          contained therein.
          <br />
          (b) When creating a Listing, you must (a) provide complete and accurate information about your Centre (such as
          listing description, location, calendar availability and the amount of the Space License Fee), (b) disclose
          any deficiencies, restrictions and requirements that apply, and (c) provide any other pertinent information
          requested by the Platform.
          <br />
          (c) You are responsible for keeping your Centre Listing information up-to-date at all times. All photos and
          videos used in your Centre Listing must accurately reflect the quality and condition of your Centre.
          <br />
          (d) When you accept a booking request by a PRO, you are entering into a legally binding contract with the PRO
          and are required to make your Centre available to the PRO as described in your Centre Listing when the booking
          request is made. (e) You may not post a Centre Listing on behalf of any third party. (f) You are authorized to
          enter into contracts for and bind your co-owner, co-renter, team, business or other organization, and that
          each entity you use is in good standing under the laws of the place where it is established.
          <br />
          (g) Ιt is your responsibility to ensure and you undertake and represent that:
          <br />
          (i) the terms of your booking are complete and accurate;
          <br />
          (ii) you will cooperate with the Pros in all matters relating to the Services;
          <br />
          (iii) you will provide us, our employees, agents, consultants and subcontractors, with access to your
          premises, office accommodation and other facilities as we may reasonably require;
          <br />
          (iv) you provide us with such information and materials we may reasonably require in order to supply the
          Services, and ensure that such information is complete and accurate in all material respects;
          <br />
          (v) you prepare your premises for the supply of the Services;
          <br />
          (h) you obtain and maintain all necessary licences, permissions and consents which may be required for the
          Services before the date on which the Services are to start;
          <br />
          (i) you comply with all applicable laws, including health and safety laws;
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          7. PROs Terms
        </h6>
        <p className="ptag">
          7.1 If you are a <span className="key-text">PRO</span>, you acknowledge and agree that:
          <br />
          (a) You may book a Centre only on your behalf and for your benefit. You cannot book a Centre on behalf of or
          for use by any third party
          <br />
          (b) When you make a Booking with a Host, you are entering into a legally binding contract with the Host. When
          you receive the booking confirmation, a contract for Host Services is formed directly between you and the
          Host. In addition to these Terms of Use, you will be subject to, and responsible for complying with, all any
          other rules, standards, policies, or requirements identified in the Centre Listing that apply to the Booking.
          It is your responsibility to read and understand these rules, standards, policies, and requirements prior to
          booking a Centre.
          <br />
          (c) You will use the centre solely for the purposes of providing rehabilitation services to your customers.
          <br />
          (d) You will not cause any nuisance or damage and will not condone or tolerate inappropriate behaviour.
          <br />
          (e) You are responsible to leave the Centre in the condition it was when you arrived.
          <br />
          (f) You are responsible for any and all loss or damage of or to any equipment and/or machinery that may be
          located in the Centre.
          <br />
          (g) You are responsible for paying all reasonable amounts that may be necessary to cover any and all damage
          that you may cause to the Centre.
          <br />
          (h) You must always act with integrity, treat others with respect, and comply with applicable laws, and
          regulations, including health and safety laws.
          <br />
          (i) Ιt is your responsibility to ensure (and you undertake and represent) that:
          <br />
          (i) The terms of your profile are complete and accurate;
          <br />
          (ii) You cooperate with the Hosts in all matters relating to the Services;
          <br />
          (iii) you provide the Hosts with such information and materials the Host may reasonably require in order to
          supply the Services, and ensure that such information is complete and accurate in all material respects;
          <br />
          (iv) you obtain and maintain all necessary licences, permissions and consents which may be required for the
          Services before the date on which the Services are to start;
          <br />
          (v) you comply with all applicable laws, including health and safety;
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          8. Account Registration
        </h6>
        <p className="ptag">
          8.1 To access the Services, you must register for an account. When you register for an account, you may be
          required to provide us with some information about yourself, such as your name, email address, or other
          contact information. Certain features of the Services may only be available to specific Users.
          <br />
          8.2 You represent and warrant that the information you provide to us is accurate and that you will keep it
          accurate and up-to-date at all times.
          <br />
          8.3 When you register, you will be asked to provide a password. You must not share your password or login
          credentials with a third party and are solely responsible for maintaining the confidentiality of your account
          and password, and you accept responsibility for all activities that occur under your account. If you believe
          that your account is no longer secure, then you must immediately notify us at rehubcy@gmail.com.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          9. Eligibility
        </h6>
        <p className="ptag">
          9.1 You must be 18 years of age or older to visit or use any of the Services in any manner.
          <br />
          9.2 By agreeing to these Terms of Use, you represent and warrant to us that:
          <br />
          (a) you are at least 18 years old;
          <br />
          (b) you have not previously been suspended or removed from the Services; and
          <br />
          (c) your registration and your use of the Services is in compliance with any and all applicable laws and
          regulations.
          <br />
          9.3 If you are an entity, organization, or company, the individual accepting these Terms of Use on your behalf
          represents and warrants that they have authority to bind you to these Terms of Use and you agree to be bound
          by these Terms of Use.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          10. Use of the services
        </h6>
        <p className="ptag">
          10.1 We reserve the right to remove any Hosts, Centre Listing or PROs for any reason and will remove it if it
          violates these Terms of Use. A Centre Listing may not contain:
          <br />
          (a) any hyperlinks, other than those specifically authorized by the Platform;
          <br />
          (b) misleading, unreadable, or “hidden” keywords, repeated keywords or keywords that are irrelevant to the
          Centre Booking being presented, as determined in Platform’s reasonable discretion
          <br />
          (c) the names, logos or trademarks of companies that are not affiliated with you, or any names, logos or
          trademarks intended to mislead Users;
          <br />
          (d) inaccurate, false, or misleading information.
          <br />
          10.2 Limited License: Subject to your complete and ongoing compliance with these Terms of Use, the Platform
          authorizes you to access and use the Services. Except and solely to the extent such a restriction is
          impermissible under applicable law, you may not: (a) reproduce, distribute, publicly display, or publicly
          perform the Services; (b) make modifications to the Services; or (c) interfere with or circumvent any feature
          of the Services, including any security or access control mechanism. If you are prohibited under applicable
          law from using the Services, you may not use them.
          <br />
          10.3 Compliance with Law. We reserve the right to amend the specification of the Services if required by any
          applicable statutory or regulatory requirement or if the amendment will not materially affect the nature or
          quality of the Services.
          <br />
          10.4 Reasonable care and skill. We warrant to you that the Services will be provided using reasonable care and
          skill.
          <br />
          10.5 Time for performance. We will use all reasonable endeavours to meet any performance dates specified in
          the Booking Confirmation, but any such dates are estimates only and failure to perform the Services by such
          dates will not give you the right to terminate the Contract.
          <br />
          10.6 If our ability to perform the Services is prevented or delayed by any breach of these Terms of Use (Your
          Default):
          <br />
          (a) we will be entitled to suspend performance of the Services until you remedy Your Default, and to rely on
          Your Default to relieve us from the performance of the Services, in each case to the extent Your Default
          prevents or delays performance of the Services. In certain circumstances Your Default may entitle us to
          terminate the Contract under clause 15 (Termination);
          <br />
          (b) we will not be responsible focor any sts or losses you sustain or incur arising directly or indirectly
          from our failure or delay to perform the Services; and
          <br />
          (c) it will be your responsibility to reimburse us on written demand for any costs or losses we sustain or
          incur arising directly or indirectly from Your Default.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          11. Platform Content and IP, Content Sharing and Listings
        </h6>
        <p className="ptag">
          11.1 Whenever you make use of a feature that allows you to upload content to our Platform, or to make contact
          with other users of our Platform, you must comply with the content standards of the Platform.
          <br />
          11.2 You warrant that any such contribution does comply with those standards, and you will be liable to us and
          indemnify us for any breach of that warranty. This means you will be responsible for any loss or damage we
          suffer as a result of your breach of warranty.
          <br />
          11.3 Any content you upload to our Platform will be considered non-confidential and non-proprietary. You
          retain all of your ownership rights in your content, but you grant us the following rights to use that
          content:
          <br />
          (a) a worldwide, non-exclusive, royalty-free, transferable licence to use, reproduce, distribute, prepare
          derivative works of, display, and perform that user-generated content in connection with the service provided
          by the Platform and across different media including to promote the Platform or the service;
          <br />
          (b) a worldwide, non-exclusive, royalty-free, transferable licence for other users, partners or advertisers to
          use the content in accordance with the functionality of the Platform.
          <br />
          11.4 We also have the right to disclose your identity to any third party who is claiming that any content
          posted or uploaded by you to our Platform constitutes a violation of their intellectual property rights or of
          their right to privacy. 11.5 We have the right to remove any posting you make on our Platform if, in our
          opinion, your post does not comply with the content standards. 11.6 You are solely responsible for securing
          and backing up your content.
          <br />
          11.7 You must not upload any material that could incite a terrorist offence, solicit any person to participate
          in terrorist activities, provide instruction on any method or technique for committing a terrorist offence or
          threaten to commit a terrorist offence.
          <br />
          11.8 You may not use the Platform to do or share anything:
          <br />
          (a) That breaches these Terms of Use.
          <br />
          (b) That is unlawful, misleading, discriminatory or fraudulent (or assists someone else in using our Platform
          in such a way).
          <br />
          (c) That you do not own or have the necessary rights to share.
          <br />
          (d) That infringes or violates someone else's rights, including their intellectual property rights (such as by
          infringing another's copyright or trademark, or distributing or selling counterfeit or pirated goods), unless
          an exception or limitation applies under applicable law.
          <br />
          (e) You may not upload viruses or malicious code, use the services to send spam or do anything else that could
          disable, overburden, interfere with or impair the proper working, integrity, operation or appearance of our
          services, systems or Platform.
          <br />
          (f) You may not access or collect data from our Platform using automated means (without our prior permission)
          or attempt to access data that you do not have permission to access. We reserve all of our rights against text
          and data mining.
          <br />
          11.9 We are the owner or the licensee of all intellectual property rights in our Platform, and in the material
          published on it. Those works are protected by copyright laws and treaties around the world. All such rights
          are reserved.
          <br />
          11.10 You may print off one copy, and may download extracts, of any page(s) from our Platform for your
          personal use and you may draw the attention of others within your organisation to content posted on our
          Platform.
          <br />
          11.11 You must not modify the paper or digital copies of any materials you have printed off or downloaded in
          any way, and you must not use any illustrations, photographs, video or audio sequences or any graphics
          separately from any accompanying text.
          <br />
          11.12 Our status (and that of any identified contributors) as the authors of content on our Platform must
          always be acknowledged (except where the content is user-generated).
          <br />
          11.13 You must not use any part of the content on our Platform for commercial purposes without obtaining a
          licence to do so from us or our licensors.
          <br />
          11.14 If you print off, copy, download, share or repost any part of our Platform in breach of these Terms of
          Use, your right to use our Platform will cease immediately and you must, at our option, return or destroy any
          copies of the materials you have made.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          12. Other obligations of Platform Users
        </h6>
        <p className="ptag">
          12.1 You agree not to do any of the following while visiting or using the Platform or any Services provided by
          or through the Platform:
          <br />
          (a) restrict or inhibit any other user from using and enjoying the Platform or the Services;
          <br />
          (b) impersonate any person or entity or falsely state or otherwise misrepresent your professional or other
          affiliation with any person or entity or indicate that you are an employee or representative;
          <br />
          (c) post or transmit unlawful, offensive, threatening, abusive, libelous, defamatory, obscene, vulgar,
          pornographic, profane or indecent information of any kind, including, without limitation, any images or other
          material depicting nudity;
          <br />
          (d) post or transmit comments containing harassing or offensive language or engage in disruptive activities
          online;
          <br />
          (e) post or transmit any information or software which contains a virus, worm or other harmful component;
          <br />
          (f) post or transmit any unsolicited advertising, promotional materials, “junk mail," “spam,” “chain letters”
          or any other form of solicitation on the Platform or through the Platform or the Services;
          <br />
          (g) post, upload or transmit any material that is fraudulent or violates or infringes the rights of others,
          including material that violates privacy or publicity rights, or infringes copyright, trademark or other
          intellectual property and/or proprietary rights;
          <br />
          (h) post or transmit material that encourages or provides instructional information about illegal activities,
          in particular hacking, cracking or distribution of counterfeit software;
          <br />
          (i) solicit other users to join or contribute money to any online service or other organization, advocate or
          attempt to get users to join in illegal schemes or plan or participate in scams involving other users;
          <br />
          (j) violate any applicable law or regulation, including without limitation any local, state, provincial,
          national or international law, any export control laws, or any regulations promulgated by any state or federal
          authority;
          <br />
          (k) access or use password protected, secure or non-public areas of the Platform or the Services without
          authorization;
          <br />
          (l) frame, repackage, or otherwise redistribute any portion of the Platform or the Services; or
          <br />
          (m) use the Platform or any Services to collect personally identifying information about users of the Platform
          or the Services, or conduct any activity in violation of our Privacy Policy.
          <br />
          12.2 We may terminate your access to the Platform and/or the Services at any time for any reason or no reason,
          including, but not limited to, as a result of your violation or threatened violation of any of the obligations
          described above, in our sole and absolute discretion. We will not be liable to you or any third party as a
          result of such termination. The Terms of Use provided in these Terms of Use will survive any such termination.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          13. Charges and Payment
        </h6>
        <p className="ptag">
          13.1 Before confirming a Centre Booking, the PROs will be shown a breakdown of the total fee payable (the
          Total Fee) which will comprise of:
          <br />
          (a) The amount of the Space License Fee (the Space License Fee) for the relevant booking, which is set by the
          host.
          <br />
          (b) Our charge for each <span className="key-text">Centre Booking</span> plus <span className="key-text">VAT</span> (the Platform Fee), in consideration for our Services.
          <br />
          13.2 <span className="key-text">PROs</span> will pay the Total Fee online through <span className="key-text">JCC</span> or another card processor of our choosing (the Card
          Processor).
          <br />
          13.3 We will remit the Space License Fee to the host at the end of each month, to the account designated by
          the Host.
          <br />
          13.4 The zs will only be entitled to use the Centre and/or Centre Booking if they have successfully made
          payment of the Total Fee.
          <br />
          13.5 There is no fee guarantee. The Total Fee, Space License Fee and Platform Fee may change from time to
          time. Changes to fees will not affect any Booking you have already made. Other than for Bookings that have
          been made and paid for, we and the Hosts fully reserve the right to make changes at any time and without any
          prior notice
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          14. Cancellation Policy
        </h6>
        <p className="ptag">
          14.1 zs can cancel a booking at any time up to 24 hours before the time of the booking.
          <br />
          14.2 <span className="key-text">PROs</span> who cancel at least 24 hours from the start time of the booking, will be entitled to a refund.
          <br />
          14.3 Any <span className="key-text">PRO</span> who does not show-up or who cancels, without allowing at least 24 hours from the time of the
          Booking will not be entitled to any refund and in that event the Total Fee will be payable to the Host (the
          Space License Fee) and the Platform (the Platform Fee).
          <br />
          14.4 If a Host cancels a booking at any time, the Total Fee will be refunded to the <span className="key-text">PRO</span>.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          15. Confidentiality
        </h6>
        <p className="ptag">
          15.1 We each undertake that we will not at any time during the Contract, and for a period of five years after
          termination of the Contract, disclose to any person any confidential information concerning one another's
          business, affairs, customers, clients or suppliers, except as permitted by clause 14.2.
          <br />
          15.2 We each may disclose the other's confidential information:
          <br />
          (a) to such of our respective employees, officers, representatives, subcontractors or advisers who need to
          know such information for the purposes of exercising our respective rights or carrying out our respective
          obligations under the Contract. We will each ensure that such employees, officers, representatives,
          subcontractors or advisers comply with this clause 14; and
          <br />
          (b) as may be required by law, a court of competent jurisdiction or any governmental or regulatory authority.
          <br />
          15.3 Each of us may only use the other's confidential information for the purpose of fulfilling our respective
          obligations under the Contract.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          16. Termination, consequences of termination and survival
        </h6>
        <p className="ptag">
          16.1 Termination. Without limiting any of our other rights, we may suspend the performance of the Services, or
          terminate the Contract with immediate effect by giving written notice to you if:
          <br />
          (a) you commit a material breach of any term of the Contract and (if such a breach is remediable) fail to
          remedy that breach within 5 days of you being notified in writing to do so;
          <br />
          (b) you take any step or action in connection with you entering administration, bankruptcy, provisional
          liquidation or any composition or arrangement with your creditors, being wound up (whether voluntarily or by
          order of the court, unless for the purpose of a solvent restructuring), having a receiver appointed to any of
          your assets or ceasing to carry on business or, if the step or action is taken in another jurisdiction, in
          connection with any analogous procedure in the relevant jurisdiction;
          <br />
          (c) you suspend, threaten to suspend, cease or threaten to cease to carry on all or a substantial part of your
          business; or
          <br />
          (d) your financial position deteriorates to such an extent that in our opinion your capability to adequately
          fulfil your obligations under the Contract has been placed in jeopardy.
          <br />
          16.2 Consequences of termination: Termination of the Contract will not affect your or our rights and remedies
          that have accrued as at termination.
          <br />
          16.3 Survival. Any provision of the Contract that expressly or by implication is intended to come into or
          continue in force on or after termination will remain in full force and effect.
        </p>{" "}
        <h6 className="h6tag" style={{ color: primaryColor }}>
          17. Events outside our control
        </h6>
        <p className="ptag">
          17.2 If an Event Outside Our Control takes place that affects the performance of our obligations under the
          Contract:
          <br />
          (a) we will contact you as soon as reasonably possible to notify you; and
          <br />
          (b) our obligations under the Contract will be suspended and the time for performance of our obligations will
          be extended for the duration of the Event Outside Our Control. We will arrange a new date for performance of
          the Services with you after the Event Outside Our Control is over.
          <br />
          17.3 You may cancel the Contract affected by an Event Outside Our Control which has continued for more than 30
          days. To cancel please contact us. If you opt to cancel, we will refund the price you have paid, less the
          charges reasonably and actually incurred us by in performing the Services up to the date of the occurrence of
          the Event Outside Our Control.
        </p>{" "}
        <h6 className="h6tag" style={{ color: primaryColor }}>
          18. Non-solicitation
        </h6>
        <p className="ptag">
          18.1 For the purposes of these Terms of Use Restricted Customer means any firm, company or person who, during
          the last 12 months made a Booking using our Platform;
          <br />
          18.2 In order to protect our confidential information and business and customer connections which you will or
          have had access as a result of your registration with us as a User, you hereby covenant with us that you will
          not:
          <br />
          (a) enter into any direct agreement with any Restricted Customer with a view to providing, to that Restricted
          Customer, the use of any Centre or services in competition with us or the Platform;
          <br />
          (b) endeavour to solicit or entice away from us any business or custom with any Restricted Customer.
          <br />
          (c) At any time, represent yourself as connected with us in any capacity, other than as User or former User,
          or use any registered names or trading names associated with us and the Platform.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          19. Communications between us
        </h6>
        <p className="ptag">
          19.1 When we refer to "in writing" in these Terms of Use, this includes email.
          <br />
          19.2 Any notice or other communication given by one of us to the other under or in connection with the
          Contract must be in writing and be delivered personally, sent by double-registered post or other next working
          day delivery service, or email.
          <br />
          19.3 A notice or other communication is deemed to have been received:
          <br />
          (a) if delivered personally, on signature of a delivery receipt
          <br />
          (b) if sent by email, at 9.00 am the next working day after transmission.
          <br />
          19.4 In proving the service of any notice, it will be sufficient to prove, in the case of a letter, that such
          letter was properly addressed, stamped and placed in the post and, in the case of an email, that such email
          was sent to the specified email address of the addressee.
          <br />
          19.5 The provisions of this clause will not apply to the service of any proceedings or other documents in any
          legal action.
        </p>
        <h6 className="h6tag" style={{ color: primaryColor }}>
          20. General
        </h6>
        <p className="ptag">
          20.1 Assignment and transfer
          <br />
          (a) We may assign or transfer our rights and obligations under the Contract to another entity but will always
          notify you by posting on this webpage if this happens.
          <br />
          (b) You may only assign or transfer your rights or your obligations under the Contract to another person if we
          agree in writing.
          <br />
          20.2 Variation. Any variation of the Contract only has effect if it is in writing and signed by you and us (or
          our respective authorised representatives).
          <br />
          20.3 Amendment. We reserve the right to change these Terms of Use on a going-forward basis at any time. Please
          check these Terms of Use periodically for changes. If a change to these Terms of Use materially modifies your
          rights or obligations, we may require that you accept the modified Terms in order to continue to use the
          Services. Material modifications are effective upon your acceptance of the modified Terms. Immaterial
          modifications are effective upon publication. Except as expressly permitted in this Clause 19.3, these Terms
          of Use may be amended only by a written agreement signed by authorized representatives of the parties to these
          Terms of Use. Disputes arising under these Terms of Use will be resolved in accordance with the version of
          these Terms of Use that was in effect at the time the dispute arose.
          <br />
          20.4 Waiver. If we do not insist that you perform any of your obligations under the Contract, or if we do not
          enforce our rights against you, or if we delay in doing so, that will not mean that we have waived our rights
          against you or that you do not have to comply with those obligations. If we do waive any rights, we will only
          do so in writing, and that will not mean that we will automatically waive any right related to any later
          default by you.
          <br />
          20.5 Severance. Each paragraph of these Terms of Use operates separately. If any court or relevant authority
          decides that any of them is unlawful or unenforceable, the remaining paragraphs will remain in full force and
          effect.
          <br />
          20.6 Governing law and jurisdiction. The Contract is governed by Cyprus law and we each irrevocably agree to
          submit all disputes arising out of or in connection with the Contract to the exclusive jurisdiction of the
          Cyprus courts.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default TermConditions;
