/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Page from '../../components/layouts/Page';

function TermsPage() {
  function Mailto({ email, ...props }) {
    return (
      <a className="text-blue-600" href={`mailto:${email}`}>
        {props.children}
      </a>
    );
  }

  return (
    <Page title="Terms">
      <div className="w-full c-shadow max-w-lg mx-auto my-12 bg-white">
        <div className="flex justify-center h-72">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="600">
            <title>Terms</title>
            <path
              d="M869.443,802.83547H313.68507V92.17481s590.04937-54.39333,555.75792,0S869.443,802.83547,869.443,802.83547Z"
              transform="translate(-312.50261 -68)"
              fill="#f2f2f2"
            />
            <polygon
              points="558.123 736.018 0 736.018 0 22.992 332.43 22.992 332.43 25.357 2.365 25.357 2.365 733.653 555.758 733.653 555.758 170.13 558.123 170.13 558.123 736.018"
              fill="#3f3d56"
            />
            <path
              d="M719.65,276.153c-15.43323.00116-32.03622-3.17209-47.12764-12.7034-43.77829-27.65163-85.79617-.29619-86.21477-.01616l-.13568.07794c-.38915.19054-26.33984,12.63931-56.89856,12.64162-15.43323.00116-32.03622-3.17209-47.12764-12.7034-43.77829-27.65163-85.79559-.29619-86.21477-.01616l-1.31179-1.9677c.433-.28811,43.72864-28.47381,88.78985-.01616,43.20727,27.29135,99.48746,1.00578,101.66186-.03291,2.06411-1.32854,44.541-27.86354,88.71479.03291,43.86894,27.70648,101.14915.22,101.72248-.06178l1.04043,2.12358C776.15943,263.70191,750.20874,276.15068,719.65,276.153Z"
              transform="translate(-312.50261 -68)"
              fill="#3f3d56"
            />
            <path
              d="M719.65,332.91125c-15.43323.00115-32.03622-3.1721-47.12764-12.7034-43.77829-27.65106-85.79617-.29619-86.21477-.01617l-.13568.07795c-.38915.19053-26.33984,12.63931-56.89856,12.64162-15.43323.00115-32.03622-3.1721-47.12764-12.7034-43.77829-27.65106-85.79559-.29619-86.21477-.01617l-1.31179-1.96769c.433-.28811,43.72864-28.47382,88.78985-.01617,43.20727,27.29078,99.48746,1.00637,101.66186-.03291,2.06411-1.32911,44.541-27.86411,88.71479.03291,43.86894,27.70764,101.14915.21941,101.72248-.06178l1.04043,2.12359C776.15943,320.46016,750.20874,332.90894,719.65,332.91125Z"
              transform="translate(-312.50261 -68)"
              fill="#3f3d56"
            />
            <path
              d="M719.65,389.66951c-15.43323.00115-32.03622-3.1721-47.12764-12.70341-43.77829-27.65221-85.79617-.29677-86.21477-.01616l-.13568.07794c-.38915.19054-26.33984,12.63932-56.89856,12.64163-15.43323.00115-32.03622-3.1721-47.12764-12.70341-43.77829-27.65221-85.79559-.29677-86.21477-.01616l-1.31179-1.9677c.433-.28811,43.72864-28.47439,88.78985-.01616,43.20727,27.29135,99.48746,1.00636,101.66186-.03291,2.06411-1.32854,44.541-27.86469,88.71479.03291,43.86894,27.70648,101.14915.22,101.72248-.06178l1.04043,2.12358C776.15943,377.21842,750.20874,389.6672,719.65,389.66951Z"
              transform="translate(-312.50261 -68)"
              fill="#3f3d56"
            />
            <path
              d="M540.41844,446.52014c-.47634,0-.95382-.01386-1.43536-.04388-7.73855-.48037-14.60411-4.87651-20.40384-13.06888-5.74777-8.11789-11.85813-12.19127-18.29817-12.11217-10.74552.13569-18.80625,11.96841-18.88651,12.08792l-.10912.13857c-.51675.56641-12.82176,13.8749-27.43974,12.95456-7.73855-.48037-14.60412-4.87651-20.40385-13.06888-5.74776-8.11789-11.91066-12.19127-18.29816-12.11217-10.74552.13569-18.80625,11.96841-18.88651,12.08792l-1.96423-1.31757c.35566-.53,8.84654-12.984,20.82072-13.13527,7.25125-.1253,14.03367,4.32049,20.25777,13.111,5.36381,7.57458,11.62544,11.637,18.61052,12.07349,13.02789.8037,24.61407-11.18722,25.5038-12.13065.82276-1.19863,9.15717-12.90721,20.76529-13.05386.07275-.00116.14665-.00116.21882-.00116,7.13751,0,13.87721,4.40941,20.039,13.11218,5.36381,7.57458,11.62544,11.637,18.61053,12.07349,13.50191.85451,25.43855-12.0579,25.55749-12.18838l1.746,1.59528C565.92282,434.06963,554.388,446.519,540.41844,446.52014Z"
              transform="translate(-312.50261 -68)"
              fill="#3f3d56"
            />
            <polygon
              points="334.637 603.582 223.486 603.582 223.486 527.904 308.623 527.904 308.623 530.269 225.851 530.269 225.851 601.217 332.272 601.217 332.272 565.743 334.637 565.743 334.637 603.582"
              fill="#3f3d56"
            />
            <path
              d="M382.268,172.58234a14.18957,14.18957,0,1,1,14.18956-14.18956A14.20583,14.20583,0,0,1,382.268,172.58234Zm0-26.0142a11.82464,11.82464,0,1,0,11.82463,11.82464A11.83781,11.83781,0,0,0,382.268,146.56814Z"
              transform="translate(-312.50261 -68)"
              fill="#3182ce"
            />
            <polygon
              points="308.091 577.802 279.96 538.955 287.623 533.408 309.155 563.144 391.554 478.489 398.332 485.087 308.091 577.802"
              fill="#3182ce"
            />
            <path
              d="M725.77366,337.536S739.96322,374.1924,713.949,374.1924s40.20377,36.65637,66.218,15.372,10.64217-22.46681,10.64217-22.46681-34.29145,3.5474-33.109-27.19666Z"
              transform="translate(-312.50261 -68)"
              fill="#a0616a"
            />
            <circle cx="429.25668" cy="234.94048" r="46.09372" fill="#2f2e41" />
            <path
              d="M718.67888,490.07384,673.74526,605.95527s-22.46681,35.47391-14.18957,70.94782,27.19667,99.327,27.19667,99.327,21.28434-8.27724,20.10188-23.64927,9.45971-69.76536-8.27724-89.86724l62.67057-88.68477,2.36493,93.41462s-4.72986,42.5687-3.54739,61.48812,3.54739,50.84593,3.54739,50.84593l14.18956-2.36492s24.83174-87.50232,22.46681-115.88144c0,0,44.93362-138.34825,0-171.45723Z"
              transform="translate(-312.50261 -68)"
              fill="#2f2e41"
            />
            <path
              d="M690.29975,770.31772s-10.64217,0-9.45971,9.45971-9.45971,55.57579,13.0071,52.0284,24.83174-26.0142,24.83174-41.38622,1.18246-16.5545,3.54739-20.10189,9.45971-34.29144,0-33.109-20.10188,7.09478-20.10188,7.09478S705.67178,770.31772,690.29975,770.31772Z"
              transform="translate(-312.50261 -68)"
              fill="#2f2e41"
            />
            <path
              d="M770.70728,770.31772s-16.55449-2.36492-15.372,3.54739-2.36493,30.74406,0,33.109,7.09478,7.09478,7.09478,10.64217,1.18247,15.372,21.28435,11.82464,15.372-21.28435,14.18956-23.64928-15.372-14.18956-14.18956-21.28434S777.80206,765.58787,770.70728,770.31772Z"
              transform="translate(-312.50261 -68)"
              fill="#2f2e41"
            />
            <circle cx="429.82554" cy="254.164" r="31.92652" fill="#a0616a" />
            <path
              d="M772.481,364.14146s10.2159,20.21214-20.862,20.56333c-9.76174.11031-19.07214-8.27783-25.254-15.83348-2.18248-2.66747-3.104,2.80835-7.09478,2.36493-10.64217-1.18247-39.61253.59123-39.61253,19.51065s33.109,91.0497,30.744,98.14448-14.18956,5.91232,0,10.64217,42.56869-7.09478,61.48811,2.36493,36.65638-14.18956,36.65638-14.18956L836.92524,386.017S793.76532,359.4116,772.481,364.14146Z"
              transform="translate(-312.50261 -68)"
              fill="#575a89"
            />
            <path
              d="M690.29975,555.10934s-29.56159,23.64927-16.55449,31.92652,28.37913-31.92652,28.37913-31.92652Z"
              transform="translate(-312.50261 -68)"
              fill="#a0616a"
            />
            <path
              d="M803.81626,469.972s-39.0213,15.372-26.0142,23.64928,26.0142-14.18957,26.0142-14.18957Z"
              transform="translate(-312.50261 -68)"
              fill="#a0616a"
            />
            <path
              d="M691.48221,378.92225h0a22.75467,22.75467,0,0,0-15.044,21.02828l-1.51045,90.1233s-7.09478,73.31274,10.64218,73.31274,30.74405,5.91232,33.109,0-8.27725-59.12318-8.27725-59.12318Z"
              transform="translate(-312.50261 -68)"
              fill="#575a89"
            />
            <path
              d="M814.45843,382.46964l22.46681,3.54739s62.67058,30.74406,48.481,52.0284S810.911,490.07384,810.911,490.07384s-22.46681-10.64218-15.372-17.737,39.0213-31.92652,39.0213-31.92652l-27.19667-24.83174Z"
              transform="translate(-312.50261 -68)"
              fill="#575a89"
            />
            <polygon
              points="459.681 229.613 436.289 217.361 403.987 222.373 397.304 251.891 413.941 251.251 418.588 240.406 418.588 251.072 426.265 250.777 430.72 233.512 433.505 251.891 460.794 251.334 459.681 229.613"
              fill="#2f2e41"
            />
            <circle cx="431.68266" cy="182.37747" r="18.59922" fill="#2f2e41" />
            <path
              d="M720.73408,244.71684a18.60362,18.60362,0,0,1,15.7689-18.38521,18.59923,18.59923,0,1,0,0,36.77042A18.60365,18.60365,0,0,1,720.73408,244.71684Z"
              transform="translate(-312.50261 -68)"
              fill="#2f2e41"
            />
            <path
              d="M382.01343,763.063c6.70634,24.79066,29.67707,40.14415,29.67707,40.14415s12.09761-24.84013,5.39127-49.6308-29.67708-40.14415-29.67708-40.14415S375.30709,738.27234,382.01343,763.063Z"
              transform="translate(-312.50261 -68)"
              fill="#3f3d56"
            />
            <path
              d="M391.86793,757.73523c18.40229,17.91389,20.65,45.45171,20.65,45.45171s-27.58831-1.50633-45.99061-19.42023-20.65-45.45171-20.65-45.45171S373.46563,739.82133,391.86793,757.73523Z"
              transform="translate(-312.50261 -68)"
              fill="#3182ce"
            />
          </svg>
        </div>
        <div className="relative z-10 leading-normal bg-white p-3">
          <h1 className="px-2 mb-4 text-base leading-6 text-blue-600 font-semibold tracking-wide uppercase">
            Johnsido Terms of Use
          </h1>
          <p>
            This website is operated by Johnsido. Throughout the site, the terms “we”, “I”, “us”,
            “our”, and “Website” refer to Johnsido. Johnsido offers this website, including all
            information, tools and services available from this site to you, the user, conditioned
            upon your acceptance of all terms, conditions, policies and notices stated here.
          </p>
          <p className="mt-4">
            By visiting our site and/or purchasing something from us and other users, you engage in
            our “Service” and agree to be bound by the following terms and conditions (“Terms of
            Service”, “Terms”), including those additional terms and conditions and policies
            referenced herein and / or available by hyperlink. These Terms of Service apply to all
            users of the site, including without limitation users who are browsers, vendors,
            customers, Merchants, and / or contributors of content.
          </p>
          <p className="mt-4">
            Please read these Terms of Service carefully before accessing or using our website. By
            accessing or using any part of the site, you agree to be bound by these Terms of
            Service. If you do not agree to all the terms and conditions of this agreement, then you
            may not access the website or use any services. If these Terms of Service are considered
            an offer, acceptance is expressly limited to these Terms of Service.
          </p>
          <p className="mt-4">
            <b>LICENSE:</b> In these Website Standard Terms And Conditions, “Your Content” shall
            mean any audio, video, text, images or other material you choose to display on this
            Website. With respect to Your Content, by displaying it, you grant Johnsido a
            non-exclusive, worldwide, irrevocable, royalty-free, sub licensable license to use,
            reproduce, adapt, publish, translate and distribute it in any and all media. Your
            Content must be your own and must not be infringing on any third party’s rights.
            Johnsido reserves the right to remove any of Your Content from this Website at any time,
            and for any reason, without notice.
          </p>
          <p className="mt-4">
            <b>NO WARRANTIES:</b> This Website is provided “as is,” with all faults, and Johnsido
            makes no express or implied representations or warranties, of any kind related to this
            Website or the materials contained on this Website. Additionally, nothing contained on
            this Website shall be construed as providing consult or advice to you.
          </p>
          <p className="mt-4">
            Any new features or tools which are added to the current store shall also be subject to
            the Terms of Service. You can review the most current version of the Terms of Service at
            any time on this page. We reserve the right to update, change or replace any part of
            these Terms of Service by posting updates and / or changes to our website. It is your
            responsibility to check this page periodically for changes. Your continued use of or
            access to the website following the posting of any changes constitutes acceptance of
            those changes.
          </p>
          <h3 className="mt-8 mb-4">SECTION 1 - ONLINE STORE TERMS</h3>
          <p className="mt-4">
            By agreeing to these Terms of Service, you represent that you are at least the age of
            maturity in your state or province of residence, and you have given us your consent to
            allow any of your minor dependents to use this site. If you are under the age of
            eighteen (18), you represent that a parent or legal guardian also agrees to this section
            on your behalf. You may not use our products for any illegal or unauthorized purpose nor
            may you, in the use of the Service, violate any laws in your jurisdiction(including but
            not limited to copyright laws). You must not transmit any worms or viruses or any code
            of a destructive nature. A breach or violation of any of the Terms will result in an
            immediate termination of your Services.
          </p>
          <h3 className="mt-8 mb-4">SECTION 2 - GENERAL CONDITIONS</h3>
          <p className="mt-4">
            We reserve the right to refuse service to anyone for any reason at any time. You
            understand that your content(not including credit card information), may be transferred
            un-encrypted and involve(a) transmissions over various networks; and(b) changes to
            conform and adapt to technical requirements of connecting networks or devices. Credit
            card information is always encrypted during transfer over networks.
          </p>
          <p className="mt-4">
            You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the
            Service, use of the Service, or access to the Service or any contact on the website
            through which the service is provided, without express written permission by us. The
            headings used in this agreement are included for convenience only and will not limit or
            otherwise affect these Terms.
          </p>
          <h3 className="mt-8 mb-4">
            SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
          </h3>
          <p className="mt-4">
            We are not responsible if information made available on this site is not accurate,
            complete or current. The material on this site is provided for general information only
            and should not be relied upon or used as the sole basis for making decisions without
            consulting primary, more accurate, more complete or more timely sources of information.
            Any reliance on the material on this site is at your own risk.
          </p>
          <p className="mt-4">
            This site may contain certain historical information. Historical information,
            necessarily, is not current and is provided for your reference only. We reserve the
            right to modify the contents of this site at any time, but we have no obligation to
            update any information on our site. You agree that it is your responsibility to monitor
            changes to our site.
          </p>
          <h3 className="mt-8 mb-4">SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES</h3>
          <ul>
            <li className="mt-3">Prices for our products are subject to change without notice.</li>
            <li className="mt-3">
              We reserve the right at any time to modify or discontinue the Service(or any part or
              content thereof) without notice at any time.
            </li>
            <li className="mt-3">
              We shall not be liable to you or to any third - party for any modification, price
              change, suspension or discontinuance of the Service.
            </li>
          </ul>
          <h3 className="mt-8 mb-4">SECTION 5 - PRODUCTS OR SERVICES (if applicable)</h3>
          <p className="mt-4">
            Certain products or services may be available exclusively online through the website.
            These products or services may have limited quantities and are subject to return or
            exchange only according to our Return Policy. We have made every effort to display as
            accurately as possible the colors and images of our products that appear at the store.
            We cannot guarantee that your computer monitor 's display of any color will be accurate.
          </p>
          <p className="mt-4">
            We reserve the right, but are not obligated, to limit the sales of our products or
            Services to any person, geographic region or jurisdiction. We may exercise this right on
            a case-by-case basis. We reserve the right to limit the quantities of any products or
            services that we offer. All descriptions of products or product pricing are subject to
            change at anytime without notice, at the sole discretion of us. We reserve the right to
            discontinue any product at any time. Any offer for any product or service made on this
            site is void where prohibited.
          </p>
          <p className="mt-4">
            We do not warrant that the quality of any products, services, information, or other
            material purchased or obtained by you will meet your expectations, or that any errors in
            the Service will be corrected.
          </p>
          <h3 className="mt-8 mb-4">SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION</h3>
          <p className="mt-4">
            We reserve the right to refuse any order you place with us. We may, in our sole
            discretion, limit or cancel quantities purchased per person, per household or per order.
            These restrictions may include orders placed by or under the same customer account, the
            same credit card, and / or orders that use the same billing and / or shipping address.
            In the event that we make a change to or cancel an order, we may attempt to notify you
            by contacting the e - mail and / or billing address / phone number provided at the time
            the order was made. We reserve the right to limit or prohibit orders that, in our sole
            judgment, appear to be placed by dealers, resellers or distributors.
          </p>
          <p className="mt-4">
            You agree to provide current, complete and accurate purchase and account information for
            all purchases made at our store. You agree to promptly update your account and other
            information, including your email address and credit card numbers and expiration dates,
            so that we can complete your transactions and contact you as needed. For more detail,
            please review our Returns Policy.
          </p>
          <h3 className="mt-8 mb-4">SECTION 7 - OPTIONAL TOOLS</h3>
          <p className="mt-4">
            We may provide you with access to third-party tools over which we neither monitor nor
            have any control nor input. You acknowledge and agree that we provide access to such
            tools” as is” and“ as available” without any warranties, representations or conditions
            of any kind and without any endorsement. We shall have no liability whatsoever arising
            from or relating to your use of optional third-party tools. Any use by you of optional
            tools offered through the site is entirely at your own risk and discretion and you
            should ensure that you are familiar with and approve of the terms on which tools are
            provided by the relevant third - party provider(s).
          </p>
          <p className="mt-4">
            We may also, in the future, offer new services and/or features through the
            website(including, the release of new tools and resources).Such new features and / or
            services shall also be subject to these Terms of Service.
          </p>
          <h3 className="mt-8 mb-4">SECTION 8 - THIRD - PARTY LINKS</h3>
          <p className="mt-4">
            Certain content, products and services available via our Service may include materials
            from third-parties. Third-party links on this site may direct you to third-party
            websites that are not affiliated with us. We are not responsible for examining or
            evaluating the content or accuracy and we do not warrant and will not have any liability
            or responsibility for any third-party materials or websites, or for any other materials,
            products, or services of third - parties.
          </p>
          <p className="mt-4">
            We are not liable for any harm or damages related to the purchase or use of goods,
            services, resources, content, or any other transactions made in connection with any
            third-party websites. Please review carefully the third-party's policies and practices
            and make sure you understand them before you engage in any transaction. Complaints,
            claims, concerns, or questions regarding third-party products should be directed to the
            third-party.
          </p>
          <h3 className="mt-8 mb-4">SECTION 9 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS</h3>
          <p className="mt-4">
            If, at our request, you send certain specific submissions( for example contest entries)
            or without a request from us you send creative ideas, suggestions, proposals, plans, or
            other materials, whether online, by email, by postal mail, or otherwise(collectively,
            'comments'), you agree that we may, at any time, without restriction, edit, copy,
            publish, distribute, translate and otherwise use in any medium any comments that you
            forward to us. We are and shall be under no obligation:
          </p>
          <ul>
            <li className="mt-3">to maintain any comments in confidence;</li>
            <li className="mt-3">to pay compensation for any comments; or</li>
            <li className="mt-3">to respond to any comments.</li>
          </ul>
          <p className="mt-4">
            We may, but have no obligation to, monitor, edit or remove content that we determine in
            our sole discretion are unlawful, offensive, threatening, libelous, defamatory,
            pornographic, obscene or otherwise objectionable or violates any party’ s intellectual
            property or these Terms of Service.
          </p>
          <p className="mt-4">
            You agree that your comments will not violate any right of any third - party, including
            copyright, trademark, privacy, personality or other personal or proprietary right. You
            further agree that your comments will not contain libelous or otherwise unlawful,
            abusive or obscene material, or contain any computer virus or other malware that could
            in any way affect the operation of the Service or any related website. You may not use a
            false e - mail address, pretend to be someone other than yourself, or otherwise mislead
            us or third - parties as to the origin of any comments. You are solely responsible for
            any comments you make and their accuracy. We take no responsibility and assume no
            liability for any comments posted by you or any third-party.
          </p>
          <h3 className="mt-8 mb-4">SECTION 10 - PERSONAL INFORMATION</h3>
          <p className="mt-4">
            Your submission of personal information through the store is governed by our
            <Link className="text-blue-dark" to="/privacy">
              {' '}
              Privacy Policy
            </Link>
            .
          </p>
          <h3 className="mt-8 mb-4">SECTION 11 - ERRORS, INACCURACIES AND OMISSIONS</h3>
          <p className="mt-4">
            Occasionally there may be information on our site or in the Service that contains
            typographical errors, inaccuracies or omissions that may relate to product descriptions,
            pricing, promotions, offers, product shipping charges, transit times and availability.
            We reserve the right to correct any errors, inaccuracies or omissions, and to change or
            update information or cancel orders if any information in the Service or on any related
            website is inaccurate at any time without prior notice(including after you have
            submitted your order).
          </p>
          <p className="mt-4">
            We undertake no obligation to update, amend or clarify information in the Service or on
            any related website, including without limitation, pricing information, except as
            required by law. No specified update or refresh date applied in the Service or on any
            related website, should be taken to indicate that all information in the Service or on
            any related website has been modified or updated.
          </p>
          <h3 className="mt-8 mb-4">SECTION 12 - PROHIBITED USES</h3>
          <p className="mt-4">
            In addition to other prohibitions as set forth in the Terms of Service, you are
            prohibited from using the site or its content:
          </p>
          <ul>
            <li className="mt-3">for any unlawful purpose;</li>
            <li className="mt-3">
              to solicit others to perform or participate in any unlawful acts;
            </li>
            <li className="mt-3">
              to violate any international, federal, provincial or state regulations, rules, laws,
              or local ordinances;
            </li>
            <li className="mt-3">
              to infringe upon or violate our intellectual property rights or the intellectual
              property rights of others;
            </li>
            <li className="mt-3">
              to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or
              discriminate based on gender, sexual orientation, religion, ethnicity, race, age,
              national origin, or disability;
            </li>
            <li className="mt-3">to submit false or misleading information;</li>
            <li className="mt-3">
              to upload or transmit viruses or any other type of malicious code that will or may be
              used in any way that will affect the functionality or operation of the Service or of
              any related website, other websites, or the Internet;
            </li>
            <li className="mt-3">to collect or track the personal information of others;</li>
            <li className="mt-3">to spam, phish, pharm, pretext, spider, crawl, or scrape;</li>
            <li className="mt-3">for any obscene or immoral purpose; or</li>
            <li className="mt-3">
              to interfere with or circumvent the security features of the Service or any related
              website, other websites, or the Internet. We reserve the right to terminate your use
              of the Service or any related website for violating any of the prohibited uses.
            </li>
          </ul>
          <h3 className="mt-8 mb-4">
            SECTION 13 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
          </h3>
          <p className="mt-4">
            We do not guarantee, represent or warrant that your use of our service will be
            uninterrupted, timely, secure or error-free. We do not warrant that the results that may
            be obtained from the use of the service will be accurate or reliable.
          </p>
          <p className="mt-4">
            You agree that from time to time we may remove the service for indefinite periods of
            time or cancel the service at any time, without notice to you. You expressly agree that
            your use of , or inability to use, the service is at your sole risk. The service and all
            products and services delivered to you through the service are(except as expressly
            stated by us) provided 'as is' and 'as available' for your use, without any
            representation, warranties or conditions of any kind, either express or implied,
            including all implied warranties or conditions of merchantability, merchantable quality,
            fitness for a particular purpose, durability, title, and non - infringement.
          </p>
          <p className="mt-4">
            In no case shall Johnsido, our directors, officers, employees, affiliates, agents,
            contractors, interns, suppliers, service providers or licensors be liable for any
            injury, loss, claim, or any direct, indirect, incidental, punitive, special, or
            consequential damages of any kind, including, without limitation lost profits, lost
            revenue, lost savings, loss of data, replacement costs, or any similar damages, whether
            based in contract, tort(including negligence), strict liability or otherwise, arising
            from your use of any of the service or any products procured using the service, or for
            any other claim related in any way to your use of the service or any product, including,
            but not limited to, any errors or omissions in any content, or any loss or damage of any
            kind incurred as a result of the use of the service or any content(or product) posted,
            transmitted, or otherwise made available via the service, even if advised of their
            possibility. Because some states or jurisdictions do not allow the exclusion or the
            limitation of liability for consequential or incidental damages, in such states or
            jurisdictions, our liability shall be limited to the maximum extent permitted by law.
          </p>
          <h3 className="mt-8 mb-4">SECTION 14 - INDEMNIFICATION</h3>
          <p className="mt-4">
            You agree to indemnify, defend and hold harmless Johnsido and our parent, subsidiaries,
            affiliates, partners, officers, directors, agents, contractors, licensors, service
            providers, subcontractors, suppliers, interns and employees, harmless from any claim or
            demand, including reasonable attorneys’ fees, made by any third - party due to or
            arising out of your breach of these Terms of Service or the documents they incorporate
            by reference, or your violation of any law or the rights of a third-party.
          </p>
          <h3 className="mt-8 mb-4">SECTION 15 - SEVERABILITY</h3>
          <p className="mt-4">
            In the event that any provision of these Terms of Service is determined to be unlawful,
            void or unenforceable, such provision shall nonetheless be enforceable to the fullest
            extent permitted by applicable law, and the unenforceable portion shall be deemed to be
            severed from these Terms of Service, such determination shall not affect the validity
            and enforceability of any other remaining provisions.
          </p>
          <h3 className="mt-8 mb-4">SECTION 16 - TERMINATION</h3>
          <p className="mt-4">
            The obligations and liabilities of the parties incurred prior to the termination date
            shall survive the termination of this agreement for all purposes. These Terms of Service
            are effective unless and until terminated by either you or us. You may terminate these
            Terms of Service at any time by notifying us that you no longer wish to use our
            Services, or when you cease using our site.
          </p>
          <p className="mt-4">
            If in our sole judgment you fail, or we suspect that you have failed, to comply with any
            term or provision of these Terms of Service, we also may terminate this agreement at any
            time without notice and you will remain liable for all amounts due up to and including
            the date of termination; and / or accordingly may deny you access to our Services(or any
            part thereof).
          </p>
          <h3 className="mt-8 mb-4">SECTION 17 - ENTIRE AGREEMENT</h3>
          <p className="mt-4">
            The failure of us to exercise or enforce any right or provision of these Terms of
            Service shall not constitute a waiver of such right or provision. These Terms of Service
            and any policies or operating rules posted by us on this site or in respect to The
            Service constitutes the entire agreement and understanding between you and us and govern
            your use of the Service, superseding any prior or contemporaneous agreements,
            communications and proposals, whether oral or written, between you and us(including, but
            not limited to, any prior versions of the Terms of Service). Any ambiguities in the
            interpretation of these Terms of Service shall not be construed against the drafting
            party.
          </p>
          <h3 className="mt-8 mb-4">SECTION 18 - GOVERNING LAW</h3>
          <p className="mt-4">
            These Terms of Service and any separate agreements whereby we provide you Services shall
            be governed by and construed in accordance with the laws of Iowa, United States.
          </p>
          <h3 className="mt-8 mb-4">SECTION 19 - CHANGES TO TERMS OF SERVICE</h3>
          <p className="mt-4">
            You can review the most current version of the Terms of Service at any time at this
            page. We reserve the right, at our sole discretion, to update, change or replace any
            part of these Terms of Service by posting updates and changes to our website. It is your
            responsibility to check our website periodically for changes. Your continued use of or
            access to our website or the Service following the posting of any changes to these Terms
            of Service constitutes acceptance of those changes.
          </p>
          <h3 className="mt-8 mb-4">SECTION 20 - CONTACT INFORMATION</h3>
          <p>
            If you have any questions about the Terms of Use, please contact me at{' '}
            <Mailto email="adamu.dankore@gmail.com">adamu.dankore@gmail.com</Mailto>.
          </p>
        </div>
      </div>
    </Page>
  );
}

TermsPage.propTypes = {
  children: PropTypes.node,
  email: PropTypes.string,
};

export default TermsPage;
