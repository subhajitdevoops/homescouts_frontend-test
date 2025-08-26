import React, { useState, useEffect } from "react";
import "./TermAndCondition.css";
import { BsArrowLeft } from "react-icons/bs";

const TermAndCondition = () => {
  const handleGoBack=()=>{window.history.back()};

  return (
    <div className="TermAndCondition_main_container_div">
      <div className="sw TermAndCondition_container_div">
        <BsArrowLeft
          className="TermAndCondition_cancel_div "
          onClick={()=>handleGoBack()}

        />
        <div className="TermAndCondition_message_div">
          <h4 className=""> HomeScouts Terms and Conditions</h4>
          <br />
          <p>
            Welcome to HomeScouts! These Terms and Conditions govern your use of
            our website and the services and products offered by HomeScouts. By
            accessing or using our website and purchasing our services and
            products, you agree to be bound by these Terms and Conditions.
            Please read them carefully before proceeding. If you do not agree
            with any part of these Terms and Conditions, you must refrain from
            using our website and services.
            <br />
          </p>
          <br />
          <h5>1. General Terms</h5>
          <br />
          <p>
            1.1 Definitions In these Terms and Conditions, the following
            definitions shall apply:
            <br />
          </p>
          <br />
          <p>
            &#x2022; "HomeScouts" refers to the company offering the services
            and products through its website.
            <br />
            &#x2022;"Website" refers to the HomeScouts website accessible at
            www.homescouts.in or any of its subdomains.
            <br />
            &#x2022;"Services" refer to the services provided by HomeScouts
            through its website, including but not limited to property scouting,
            real estate consulting, and property management services.
            <br />
            &#x2022;"Products" refer to any goods or digital products offered
            for sale on the HomeScouts website.
            <br />
          </p>
          <br />
          <p>
            1.2 Acceptance of Terms By accessing and using our website, you
            agree to comply with these Terms and Conditions. If you do not agree
            with any part of these terms, you should not use our website or
            purchase our services and products.
            <br />
          </p>
          <br />
          <p>
            1.3 Age Requirement You must be at least 18 years old to use our
            website and to purchase our services and products.
            <br />
          </p>
          <br />
          <p>
            1.4 Privacy Policy Our Privacy Policy, available on the website,
            outlines how we collect, use, and protect your personal information.
            By using our website, you consent to the processing of your data as
            described in our Privacy Policy.
            <br />
          </p>
          <br />
          <p>
            1.5 Modification of Terms HomeScouts reserves the right to update or
            modify these Terms and Conditions at any time without prior notice.
            It is your responsibility to review these terms periodically.
            Continued use of our website and services after any modifications
            shall constitute your consent to the updated Terms and Conditions.
            <br />
          </p>
          <br />
          <h5 className=""> 2. Use of the Website</h5>
          <br />
          <p>
            2.1 License to Use HomeScouts grants you a limited, non-exclusive,
            non-transferable, and revocable license to access and use our
            website and its content for personal and non-commercial purposes.
            This license does not permit you to:
            <br />
          </p>
          <br />
          <p>
            &#x2022; Use the website or its content for any commercial purposes
            without prior written consent from HomeScouts.
            <br />
            &#x2022;Reproduce, distribute, modify, or create derivative works
            from the website's content without proper authorization.
            <br />
          </p>
          <br />
          <p>
            2.3 Prohibited Activities When using our website, you agree not to
            engage in any of the following prohibited activities:
            <br />
          </p>
          <br />
          <p>
            &#x2022;Violating any applicable laws or regulations.
            <br />
            &#x2022;Uploading or transmitting any harmful or malicious content,
            including viruses and malware.
            <br />
            &#x2022;Interfering with the website's proper functioning or
            compromising its security.
            <br />
            &#x2022;Using any automated means to access or collect information
            from the website.
            <br />
            &#x2022;Engaging in any conduct that could damage, disable, or
            impair the website or its services.
            <br />
          </p>
          <br />
          <p>
            2.4 Third-Party Links Our website may contain links to third-party
            websites for your convenience. These links do not imply endorsement
            by HomeScouts of the linked content. We have no control over the
            content or practices of third-party websites and disclaim any
            responsibility for their actions.
            <br />
          </p>
          <br />
          <h5 className="">3. Services and Products</h5>
          <br />
          <p>
            3.1 Service Descriptions HomeScouts provides various services
            related to property scouting, real estate consulting, and property
            management. The details of each service are available on the
            website. We make every effort to accurately describe our services,
            but we do not warrant that the descriptions are complete, reliable,
            or error-free.
            <br />
          </p>
          <br />
          <p>
            3.2 Product Descriptions The products offered on our website are
            described as accurately as possible. However, colors, sizes, and
            other product details may vary slightly from the images displayed on
            the website. HomeScouts does not guarantee that the product
            descriptions are entirely accurate, complete, or current.
            <br />
          </p>
          <br />
          <p>
            3.3 Pricing and Payment The prices of our services and products are
            listed on the website and are subject to change without notice. You
            are responsible for any applicable taxes, shipping fees, or other
            charges associated with your purchase. Payment is due at the time of
            purchase, and HomeScouts accepts various payment methods as
            indicated on the website.
            <br />
          </p>
          <br />
          <p>
            3.4 Order Acceptance Your order for services or products is subject
            to acceptance by HomeScouts. We reserve the right to reject any
            order for any reason, including but not limited to product
            unavailability, pricing errors, or suspected fraud.
            <br />
          </p>
          <br />
          <h5 className="">4. Intellectual Property</h5>
          <br />
          <p>
            4.1 Ownership All content, trademarks, logos, and intellectual
            property on the HomeScouts website are the property of HomeScouts or
            its licensors and are protected by applicable copyright and
            intellectual property laws.
            <br />
          </p>
          <br />
          <p>
            4.2 License Grant By using our website, you do not acquire any
            ownership rights to the content or intellectual property of
            HomeScouts. You are granted a limited, revocable, non-transferable
            license to access and use the website solely for personal and
            non-commercial purposes.
            <br />
          </p>
          <br />
          <p>
            4.3 User Content If you submit any content to our website, such as
            reviews or comments, you grant HomeScouts a worldwide, royalty-free,
            perpetual, irrevocable, and transferable license to use, reproduce,
            modify, distribute, display, and sublicense the content.
            <br />
          </p>
          <br />
          <h5 className="">5. Disclaimer and Limitation of Liability</h5>
          <br />
          <p>
            5.1 Disclaimer of Warranties The information, services, and products
            offered on the HomeScouts website are provided "as is" and without
            warranties of any kind, whether express or implied. HomeScouts
            disclaims all warranties, including but not limited to
            merchantability, fitness for a particular purpose, and
            non-infringement.
            <br />
          </p>
          <br />
          <p>
            5.2 Limitation of Liability HomeScouts shall not be liable for any
            direct, indirect, incidental, special, or consequential damages
            arising from the use or inability to use our website, services, or
            products. This includes damages for lost profits, data, or business
            opportunities.
            <br />
          </p>
          <br />
          <h5 className="">6. Indemnification</h5>
          <br />
          <p>
            You agree to indemnify and hold harmless HomeScouts, its officers,
            directors, employees, and affiliates from any claims, damages,
            liabilities, costs, or expenses arising from your use of our
            website, services, or products or any violation of these Terms and
            Conditions.
            <br />
          </p>
          <br /> <h5 className="">7. Governing Law and Dispute Resolution</h5>
          <br />
          <p>
            These Terms and Conditions shall be governed by the laws of the
            [State/Country] without regard to its conflict of law provisions.
            Any disputes arising from or related to these terms shall be
            resolved through negotiation and, if necessary, through arbitration
            in accordance with the rules of [Arbitration Provider].
            <br />
          </p>
          <br /> <h5 className="">8. Severability</h5>
          <br />
          <p>
            If any provision of these Terms and Conditions is deemed invalid or
            unenforceable, the remaining provisions shall remain in full force
            and effect.
            <br />
          </p>
          <br /> <h5 className="">9. Entire Agreement</h5>
          <br />
          <p>
            These Terms and Conditions constitute the entire agreement between
            you and HomeScouts regarding the use of our website, services, and
            products, superseding any prior agreements or understandings.
            <br />
            <br />
            By using our website and purchasing our services and products, you
            acknowledge that you have read, understood, and agreed to these
            Terms and Conditions. If you have any questions or concerns, please
            contact us at homescoutshouse@gmail.com.
            <br />
          </p>
          <br />
        </div>
      </div>
    </div>
  );
};

export default TermAndCondition;
