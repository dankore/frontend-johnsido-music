/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PolicyTemplate from './PolicyTemplate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PrivacyPage() {
  function Mailto({ email, ...props }) {
    return (
      <a className="text-blue-600" href={`mailto:${email}`}>
        {props.children}
      </a>
    );
  }
  return (
    <PolicyTemplate
      pageTitle="Privacy Policy"
      policyType="Johnsido Privacy Policy"
      svg={
        <svg
          style={{ width: 500 + 'px', height: 200 + 'px' }}
          xmlns="http://www.w3.org/2000/svg"
          width="990"
          height="808.85706"
          viewBox="0 0 990 808.85706"
        >
          <title>Privacy Policy</title>
          <path
            d="M1047.08458,354.9583C1002.16819,178.33685,846.96793,50.84086,664.7964,45.72711c-96.30863-2.70349-197.65219,29.23779-271.43777,141.012-131.89969,199.80845,8.10555,337.88222,105.7135,403.49213a610.75747,610.75747,0,0,1,126.24112,113.4651c65.931,78.23771,192.76719,175.45907,343.82337,23.12816C1078.62233,616.41484,1077.00333,472.60563,1047.08458,354.9583Z"
            transform="translate(-105 -45.57147)"
            fill="#f2f2f2"
          />
          <path
            d="M1095,625.24447c0,84.03741-213.16554,229.18406-486.54649,229.18406S105,713.039,105,629.00158s410.4649-216.03415,503.45351-78.89943S1095,541.20706,1095,625.24447Z"
            transform="translate(-105 -45.57147)"
            fill="#3f3d56"
          />
          <path
            d="M1095,625.24447c0,84.03741-213.16554,229.18406-486.54649,229.18406S105,713.039,105,629.00158s410.4649-216.03415,503.45351-78.89943S1095,541.20706,1095,625.24447Z"
            transform="translate(-105 -45.57147)"
            opacity="0.1"
          />
          <path
            d="M1095,629.00158c0,84.03741-221.619,152.16319-495,152.16319S105,713.039,105,629.00158,507.01139,339.70367,600,476.8384,1095,544.96418,1095,629.00158Z"
            transform="translate(-105 -45.57147)"
            fill="#3f3d56"
          />
          <ellipse cx="686.6129" cy="609.72992" rx="144.64896" ry="54.47818" opacity="0.1" />
          <ellipse cx="105.19924" cy="575.91588" rx="77.02087" ry="29.00786" opacity="0.1" />
          <path
            d="M126.31787,495.442c0,60.129,37.72178,108.78462,84.33865,108.78462"
            transform="translate(-105 -45.57147)"
            fill="#2f2e41"
          />
          <path
            d="M210.65652,604.22665c0-60.80461,42.09531-110.00692,94.117-110.00692"
            transform="translate(-105 -45.57147)"
            fill="#3182ce"
          />
          <path
            d="M156.87535,500.89282c0,57.11616,24.05447,103.33383,53.78117,103.33383"
            transform="translate(-105 -45.57147)"
            fill="#3182ce"
          />
          <path
            d="M210.65652,604.22665c0-77.69477,48.65562-140.5644,108.78462-140.5644"
            transform="translate(-105 -45.57147)"
            fill="#2f2e41"
          />
          <path
            d="M192.91384,604.9936s11.96061-.36838,15.56523-2.93518,18.39843-5.63172,19.29265-1.51512,17.97457,20.47406,4.4711,20.583-31.376-2.10337-34.97374-4.29486S192.91384,604.9936,192.91384,604.9936Z"
            transform="translate(-105 -45.57147)"
            fill="#a8a8a8"
          />
          <path
            d="M232.48381,619.69328c-13.50347.109-31.376-2.10336-34.97374-4.29486-2.73983-1.66894-3.83163-7.6575-4.19693-10.4204-.253.01088-.3993.01557-.3993.01557s.75756,9.64631,4.35525,11.83782,21.47027,4.4038,34.97374,4.29485c3.89791-.03143,5.24432-1.41825,5.17039-3.47226C236.87171,618.895,235.38508,619.66989,232.48381,619.69328Z"
            transform="translate(-105 -45.57147)"
            opacity="0.2"
          />
          <ellipse cx="380.50226" cy="432.02572" rx="99.26915" ry="37.38708" opacity="0.1" />
          <path
            d="M377.39089,315.14237c0,77.49789,48.6181,140.20819,108.70073,140.20819"
            transform="translate(-105 -45.57147)"
            fill="#2f2e41"
          />
          <path
            d="M486.09162,455.35056c0-78.36865,54.255-141.78356,121.30372-141.78356"
            transform="translate(-105 -45.57147)"
            fill="#3182ce"
          />
          <path
            d="M416.77521,322.16768c0,73.61476,31.00285,133.18288,69.31641,133.18288"
            transform="translate(-105 -45.57147)"
            fill="#3182ce"
          />
          <path
            d="M486.09162,455.35056c0-100.13772,62.7103-181.16788,140.20819-181.16788"
            transform="translate(-105 -45.57147)"
            fill="#2f2e41"
          />
          <path
            d="M463.22379,456.33905s15.41555-.47479,20.06141-3.783,23.713-7.2585,24.86553-1.95278,23.16671,26.38821,5.76263,26.5286-40.43935-2.711-45.07627-5.53549S463.22379,456.33905,463.22379,456.33905Z"
            transform="translate(-105 -45.57147)"
            fill="#a8a8a8"
          />
          <path
            d="M514.22395,475.28489c-17.40408.14042-40.43933-2.71094-45.07626-5.53548-3.53126-2.151-4.93843-9.86945-5.40926-13.43043-.32607.014-.51463.02-.51463.02s.97638,12.43276,5.61331,15.2573,27.67217,5.67589,45.07626,5.53547c5.02386-.04052,6.7592-1.82793,6.66391-4.47526C519.87935,474.256,517.96329,475.25474,514.22395,475.28489Z"
            transform="translate(-105 -45.57147)"
            opacity="0.2"
          />
          <path
            d="M667.40762,54.95255h.00009a46.52365,46.52365,0,0,1,46.52365,46.52365V148a0,0,0,0,1,0,0H620.884a0,0,0,0,1,0,0V101.47621a46.52365,46.52365,0,0,1,46.52365-46.52365Z"
            fill="#2f2e41"
          />
          <path
            d="M811.44026,190.81155l-.67813,4.39215-2.476,16.10982v24.44465l-28.38734,13.40514L753.877,251.52892l-10.251-33.48131-1.57707-5.157s.45741-.30754,1.25384-.83585c.69382-.47315,1.65581-1.11975,2.80714-1.89251,3.48537-2.34193,8.65813-5.85882,13.28684-9.0997,7.88537-5.51976,0-39.42686,0-39.42686l26.02173-2.36562s2.36561,6.3083,4.73122,19.71344c1.77421,10.05385,12.86109,11.67823,18.294,11.85958A26.41947,26.41947,0,0,0,811.44026,190.81155Z"
            transform="translate(-105 -45.57147)"
            fill="#ffb9b9"
          />
          <polygon
            points="622.855 514.276 622.855 572.627 638.626 572.627 646.511 511.91 622.855 514.276"
            fill="#ffb9b9"
          />
          <path
            d="M736.52921,598.48534l-9.46244-1.57708s-3.94269,31.54149-7.88538,38.63833-25.23319,36.27272-13.40513,37.84979,27.5988,0,28.38734-3.94269,7.09684-27.5988,7.88538-26.02173,0,17.34782,0,17.34782h3.15414V641.85489s13.40514-9.46245,9.46245-14.19367-7.88537-16.55929-7.88537-16.55929l.78854-11.82806Z"
            transform="translate(-105 -45.57147)"
            fill="#2f2e41"
          />
          <polygon
            points="742.713 514.276 742.713 572.627 726.942 572.627 719.057 511.91 742.713 514.276"
            fill="#ffb9b9"
          />
          <path
            d="M839.03906,598.48534l9.46245-1.57708s3.94269,31.54149,7.88538,38.63833,25.23319,36.27272,13.40513,37.84979-27.59881,0-28.38734-3.94269-7.09684-27.5988-7.88538-26.02173,0,17.34782,0,17.34782h-3.15415V641.85489s-13.40513-9.46245-9.46244-14.19367,7.88537-16.55929,7.88537-16.55929l-.78854-11.82806Z"
            transform="translate(-105 -45.57147)"
            fill="#2f2e41"
          />
          <circle cx="667.01339" cy="101.87052" r="29.96442" fill="#ffb9b9" />
          <path
            d="M865.84933,278.33919l-19.71343,73.334-2.36561,26.02173-14.19367-26.02173s7.88537-11.82806,9.46244-19.71343,8.67392-49.67786,8.67392-49.67786l-22.17367-47.66709-.91473-1.96345L816.96,232.604l-7.88537-10.251,4.73122-12.6166V200.274l-3.04374-5.07029-1.68748-2.81508,2.36561-1.57707,12.6166-1.57708a5.33892,5.33892,0,0,1,1.5455.10252c3.304.60714,11.284,4.23444,17.37939,24.34214C850.86712,239.70086,865.84933,278.33919,865.84933,278.33919Z"
            transform="translate(-105 -45.57147)"
            fill="#ffb9b9"
          />
          <path
            d="M753.877,268.87674V316.189L727.8553,388.73441s-6.30829,29.96442-25.23319,31.54149,12.6166-35.48418,12.6166-35.48418l20.502-78.06519V265.72259s-5.51976-21.29051-7.09684-30.753c-1.17491-7.06532,1.15913-14.56431,2.42086-17.9156.42575-1.13549.73329-1.79784.73329-1.79784l10.251-3.15415,1.25384-.04731.32323,5.99287.78854,14.55641Z"
            transform="translate(-105 -45.57147)"
            fill="#ffb9b9"
          />
          <path
            d="M818.53709,295.687s5.51977,17.34782,6.3083,18.13636-17.34782,3.94268-17.34782,3.94268H772.80193l-17.34782-7.88537,1.57707-14.98221Z"
            transform="translate(-105 -45.57147)"
            fill="#ffb9b9"
          />
          <path
            d="M827.211,305.938s-1.57708,17.34782,2.36561,23.65612,14.19367,18.13636,17.34782,52.832,7.09683,165.59284,8.67391,171.1126,6.3083,12.6166,1.57707,13.40513-41.79247,9.46245-41.79247,0,0-12.61659-2.36562-14.19367-30.753-125.37743-30.753-125.37743L756.24265,555.90432s10.251,14.19367-5.51976,12.6166-43.36956-3.94269-40.21541-11.82806a77.03406,77.03406,0,0,0,3.94269-11.82806l15.77075-141.93672s3.15414-59.92883,23.65612-91.86459l1.57707-7.59976S784.63,305.938,794.881,309.09214,827.211,305.938,827.211,305.938Z"
            transform="translate(-105 -45.57147)"
            fill="#2f2e41"
          />
          <path
            d="M825.53931,234.61478c-.66234,8.61871-4.57346,60.02346-3.84807,65.80345,0,0,3.94269,4.73123-7.88537,2.36561s-46.5237,0-50.46639.78854-8.67391,3.94269-8.67391-1.57707,1.57708-22.079-.78853-24.44466-14.19368-22.86758-13.40514-28.38734c.56772-3.96637-5.78-22.16577-9.4072-32.10927.42575-1.13549.73329-1.79784.73329-1.79784l10.251-3.15415,1.25384-.04731c.69382-.47315,1.65581-1.11975,2.80714-1.89251l3.82439,18.49911,1.57707,6.3083s26.02173,0,46.5237-14.98221l10.40866-29.14436a26.41947,26.41947,0,0,0,2.99648-.03152l12.6166-1.57708a5.33892,5.33892,0,0,1,1.5455.10252l-11.79649,35.38166,10.81871,7.93268,1.00935.74123S825.60236,233.82625,825.53931,234.61478Z"
            transform="translate(-105 -45.57147)"
            fill="#ff6584"
          />
          <polygon
            points="688.698 95.956 646.906 95.956 637.443 71.512 695.795 71.512 688.698 95.956"
            fill="#2f2e41"
          />
          <ellipse
            cx="742.44324"
            cy="153.35602"
            rx="2.36561"
            ry="6.3083"
            transform="translate(-118.34677 167.1267) rotate(-16.16012)"
            fill="#ffb9b9"
          />
          <ellipse
            cx="801.58354"
            cy="153.35602"
            rx="6.3083"
            ry="2.36561"
            transform="translate(326.18818 835.01321) rotate(-73.83988)"
            fill="#ffb9b9"
          />
          <rect x="440.52182" y="361.76028" width="161.55598" height="205.70209" fill="#fff" />
          <rect
            x="467.76091"
            y="414.82954"
            width="107.0778"
            height="30.05693"
            rx="2.77362"
            fill="#2f2e41"
          />
          <circle cx="549.47818" cy="420.46522" r="2.81784" fill="#3182ce" />
          <circle cx="557.93169" cy="420.46522" r="2.81784" fill="#3182ce" />
          <circle cx="566.3852" cy="420.46522" r="2.81784" fill="#3182ce" />
          <rect
            x="467.76091"
            y="449.58286"
            width="107.0778"
            height="30.05693"
            rx="2.77362"
            fill="#2f2e41"
          />
          <circle cx="549.47818" cy="455.21854" r="2.81784" fill="#3182ce" />
          <circle cx="557.93169" cy="455.21854" r="2.81784" fill="#3182ce" />
          <circle cx="566.3852" cy="455.21854" r="2.81784" fill="#3182ce" />
          <rect
            x="467.76091"
            y="484.33618"
            width="107.0778"
            height="30.05693"
            rx="2.77362"
            fill="#2f2e41"
          />
          <circle cx="549.47818" cy="489.97186" r="2.81784" fill="#3182ce" />
          <circle cx="557.93169" cy="489.97186" r="2.81784" fill="#3182ce" />
          <circle cx="566.3852" cy="489.97186" r="2.81784" fill="#3182ce" />
        </svg>
      }
    >
      <p>
        Johnsido ("us", "we", "I", or "our") operates the
        <Link className="text-blue-dark" to="https://john-sido.netlify.app">
          {' '}
          https://john-sido.netlify.app{' '}
        </Link>
        website and the COMING SOON mobile application (the "Service"). This page informs you of our
        policies regarding the collection, use, and disclosure of personal data when you use our
        Service and the choices you have associated with that data.
      </p>
      <p className="mt-4">
        We use your data to provide and improve the Service. By using the Service, you agree to the
        collection and use of information in accordance with this policy. Unless otherwise defined
        in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our
        Terms and Conditions.
      </p>
      <h3 className="mt-8 mb-4">Information Collection And Use</h3>
      <p>
        We collect several different types of information for various purposes to provide and
        improve our Service to you.
      </p>
      <h3 className="mt-8 mb-4">Types of Data Collected</h3>
      <h4 className="mb-4">Personal Data</h4>
      <p>
        While using our Service, we may ask you to provide us with certain personally identifiable
        information that can be used to contact or identify you("Personal Data").
      </p>
      <p className="mt-2">
        Personally identifiable information may include, but is not limited to:
      </p>
      <ul>
        <li className="mt-2">Email address</li>
        <li className="mt-2">First name and last name</li>
        <li className="mt-2">Phone number</li>
        <li className="mt-2">Address, State, Province, ZIP / Postal code, City</li>
        <li className="mt-2">Cookies and Usage Data</li>
        <li className="mt-2">Usage Data</li>
      </ul>
      <p className="mt-2">
        We may also collect information that your browser sends whenever you visit our Service or
        when you access the Service by or through a mobile device("Usage Data"). This Usage Data may
        include information such as your computer 's Internet Protocol address (e.g. IP address),
        browser type, browser version, the pages of our Service that you visit, the time and date of
        your visit, the time spent on those pages, unique device identifiers and other diagnostic
        data.
      </p>
      <p className="mt-2">
        When you access the Service by or through a mobile device, this Usage Data may include
        information such as the type of mobile device you use, your mobile device unique ID, the IP
        address of your mobile device, your mobile operating system, the type of mobile Internet
        browser you use, unique device identifiers and other diagnostic data.
      </p>
      <h3 className="mt-8 mb-4">Tracking &amp; Cookies Data</h3>
      <p>
        We use cookies and similar tracking technologies to track the activity on our Service and
        hold certain information. Cookies are files with small amount of data which may include an
        anonymous unique identifier. Cookies are sent to your browser from a website and stored on
        your device. Tracking technologies also used are beacons, tags, and scripts to collect and
        track information and to improve and analyze our Service.
      </p>
      <p className="mt-2">
        You can instruct your browser to refuse all cookies or to indicate when a cookie is being
        sent. However, if you do not accept cookies, you may not be able to use some portions of our
        Service.
      </p>
      <h4 className="mt-4 mb-2">Examples of Cookies we use:</h4>
      <ul>
        <li className="mt-2">Session Cookies: We use Session Cookies to operate our Service.</li>
        <li className="mt-2">
          Analytics Cookies: We use tracking/analytic cookies to monitor page views, unique
          visitors, and session length. No personal information is included, and the data never
          leaves our service.
        </li>
        <li className="mt-2">Security Cookies: We use Security Cookies for security purposes.</li>
      </ul>
      <p className="mt-4">
        Please refer to our{' '}
        <Link className="text-blue-dark underline" to="/cookies">
          Cookie Policy page
        </Link>{' '}
        for more info.
      </p>
      <h3 className="mt-8 mb-4">Use of Data</h3>
      <p>Johnsido uses the collected data for various purposes:</p>
      <ul>
        <li className="mt-3">To provide and maintain the Service</li>
        <li className="mt-3">To notify you about changes to our Service</li>
        <li className="mt-3">
          To allow you to participate in interactive features of our Service when you choose to do
          so
        </li>
        <li className="mt-3">To provide customer care and support</li>
        <li className="mt-3">
          To provide analysis or valuable information so that we can improve the Service
        </li>
        <li className="mt-3">To monitor the usage of the Service</li>
        <li className="mt-3">To detect, prevent and address technical issues</li>
      </ul>
      <h3 className="mt-8 mb-4">Transfer Of Data</h3>
      <p>
        Your information, including Personal Data, may be transferred to— and maintained on—
        computers located outside of your state, province, country or other governmental
        jurisdiction where the data protection laws may differ than those from your jurisdiction.
      </p>
      <p className="mt-2">
        If you are located outside United States and choose to provide information to us, please
        note that we transfer the data, including Personal Data, to United States and process it
        there. Your consent to this Privacy Policy followed by your submission of such information
        represents your agreement to that transfer.
      </p>
      <p className="mt-2">
        Johnsido will take all steps reasonably necessary to ensure that your data is treated
        securely and in accordance with this Privacy Policy and no transfer of your Personal Data
        will take place to an organization or a country unless there are adequate controls in place
        including the security of your data and other personal information.
      </p>
      <h3 className="mt-8 mb-4">Disclosure Of Data</h3>
      <h4 className="mb-4">Legal Requirements</h4>
      <p>
        Johnsido may disclose your Personal Data in the good faith belief that such action is
        necessary to:
      </p>
      <ul>
        <li className="mt-2">To comply with a legal obligation</li>
        <li className="mt-2">To protect and defend the rights or property of Johnsido</li>
        <li className="mt-2">
          To prevent or investigate possible wrongdoing in connection with the Service
        </li>
        <li className="mt-2">
          To protect the personal safety of users of the Service or the public
        </li>
        <li className="mt-2">To protect against legal liability</li>
      </ul>
      <h3 className="mt-8 mb-4">Security Of Data</h3>
      <p>
        The security of your data is important to us, but remember that no method of transmission
        over the Internet, or method of electronic storage is 100% secure. While we strive to use
        commercially acceptable means to protect your Personal Data, we cannot guarantee its
        absolute security.
      </p>
      <h3 className="mt-8 mb-4">Service Providers</h3>
      <p>
        We may employ third party companies and individuals to facilitate our Service ("Service
        Providers"), to provide the Service on our behalf, to perform Service - related services or
        to assist us in analyzing how our Service is used.
      </p>
      <p>
        These third parties have access to your Personal Data only to perform these tasks on our
        behalf and are obligated not to disclose or use it for any other purpose.
      </p>
      <h3 className="mt-8 mb-4">Links To Other Sites</h3>
      <p>
        Our Service may contain links to other sites that are not operated by us. If you click on a
        third - party link, you will be directed to that third party 's site. We strongly advise you
        to review the Privacy Policy of every site you visit. We have no control over and assume no
        responsibility for the content, privacy policies or practices of any third - party sites or
        services.
      </p>
      <h3 className="mt-8 mb-4">Children's Privacy</h3>
      <p>
        Our Service does not address anyone under the age of 18("Children"). We do not knowingly
        collect personally identifiable information from anyone under the age of 18. If you are a
        parent or guardian and you are aware that your Children has provided us with Personal Data,
        please contact us. If we become aware that we have collected Personal Data from children
        without verification of parental consent, we take steps to remove that information from our
        servers.
      </p>
      <h3 className="mt-8 mb-4">Changes To This Privacy Policy</h3>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by
        posting the new Privacy Policy on this page. We will let you know via email and / or a
        prominent notice on our Service, prior to the change becoming effective and update the
        "effective date" at the top of this Privacy Policy.
      </p>
      <p className="mt-2">
        You are advised to review this Privacy Policy periodically for any changes. Changes to this
        Privacy Policy are effective when they are posted on this page.
      </p>
      <h3 className="mt-8 mb-4">Contact Us</h3>
      <p>
        If you have any questions about the Privacy Policy, please contact me at{' '}
        <Mailto email="johnsidoidoko@gmail.com">johnsidoidoko@gmail.com</Mailto>.
      </p>
    </PolicyTemplate>
  );
}

PrivacyPage.propTypes = {
  children: PropTypes.node,
  email: PropTypes.string,
};

export default PrivacyPage;
