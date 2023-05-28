import React, { useEffect } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./about.css";

function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <div className="about-main">
        <div className="Bold-text1">Who We Are</div>
        <div>
          <p>
            <span className="Bold-text">ReHub</span>
            {" "}

            was developed and is owned by
            {" "}
            <span className="Bold-text"> PhysioQ Ltd</span>
            , a Cyprus registered company. We are a team of committed and
            experienced high energy professionals with expertise in physiotherapy and marketing. We have been
            specializing in the distribution of medical and athletic equipment and the organization of educational
            seminars for medical professionals.
            <span className="Bold-text"> PhysioQ </span>
            {" "}

            was established in 2017
            with the purpose of improving the quality of life of people in Cyprus, by helping them to be healthier,
            stronger and happier through the introduction of new technology and expertise in the sectors of paramedics
            and wellness.
          </p>
          <p>
            For us the term “Rehabilitation” has a broader definition. In an age of pollution, stress and poor
            nutrition, we are Redefining Rehabilitation. Rehabilitation is any activity we engage in to maintain and
            improve our physical and mental health. For us rehabilitation entails physiotherapy, exercise, chiropractic,
            acupuncture, psychotherapy, ergotherapy, reflexology, beauty, meditation, yoga, coaching, nutrition and many
            other practices.
          </p>
          <p>
            We at
            {" "}

            {" "}
            <span className="Bold-text"> PhysioQ </span>
            {" "}

            {" "}
            expect everyone who interacts with us, whether
            in person or online, whether they are customers, partners, workers or collaborators, to look forward to this
            connection, because we are fair, honest and dependable. Our platform,
            {" "}
            <span className="Bold-text">ReHub</span>
            , enables us to achieve this. Your feedback is precious to us to
            help us improve. Together, let’s Redefine Rehabilitation.
          </p>
        </div>
        <div>
          <p className="Bold-text1">Are you curious about How ReHub was born?</p>
          <p>
            During these times of economic hardship, we have come to understand how important it is for a community to
            share resources in order to survive. And as digitalisation is a one-way path for all industries, and in
            particular health and wellness, we are now introducing the first phase of
            {" "}
            <span className="Bold-text">ReHub</span>
            {" "}
            for physiotherapists.
            <span className="Bold-text">ReHub</span>
            {" "}
            will
            eventually open up membership to other rehabilitation specialists, and it will also be made available to the
            general public so that they can make bookings online, easily and safely.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
