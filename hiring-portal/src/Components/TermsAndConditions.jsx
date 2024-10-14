import '../CSS/termsAndConditions.css'
import Footer from './Footer';
import Navbar from './Navbar';
const TermsAndConditions = () => {
    return (
        <>
            <Navbar />
            <section className="terms-and-conditions px-6 py-10 w-4/5 mx-auto font-sans text-gray-900">
                <h1 className="text-4xl font-bold text-center mb-10 font-serif text-purple-600 transition duration-300 hover:scale-95 cursor-pointer hover:text-blue-700">
                    Terms and Conditions
                </h1>
                <p className="mb-8 text-lg">
                    Welcome to our hiring portal. These terms and conditions outline the rules and regulations for using our website and services. By accessing or using the platform, you agree to be bound by these terms.
                </p>

                <div className="mb-10 p-6 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-6 text-black transition duration-300 hover:scale-95 cursor-pointer hover:text-blue-600">
                        1. Use of the Platform
                    </h2>
                    <p className="mb-4 text-lg">
                        By using our platform, you agree to comply with the following conditions:
                    </p>
                    <ul className="list-disc list-inside space-y-3 text-lg">
                        <li>You must be at least 18 years old to apply for jobs.</li>
                        <li>You must provide accurate and complete information during the application process.</li>
                        <li>You must not use the platform for any unlawful purposes.</li>
                    </ul>
                </div>
                <div className="mb-10 p-6 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-6 text-black transition duration-300 hover:scale-95 cursor-pointer hover:text-blue-600">
                        2. Intellectual Property Rights
                    </h2>
                    <p className="mb-4 text-lg">
                        All content on this platform, including text, graphics, logos, and software, is owned by our company or licensed to us. You may not reproduce, distribute, or use any content without our permission.
                    </p>
                </div>

                <div className="mb-10 p-6 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-6 text-black transition duration-300 hover:scale-95 cursor-pointer hover:text-blue-600">
                        3. User Accounts
                    </h2>
                    <p className="mb-4 text-lg">
                        If you create an account on our platform, you are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                    </p>
                </div>
                <div className="mb-10 p-6 bg-gray-100 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-6 text-black transition duration-300 hover:scale-95 cursor-pointer hover:text-blue-600">
                        4. Termination of Use
                    </h2>
                    <p className="mb-4 text-lg">
                        We reserve the right to terminate your access to the platform without notice if you violate these terms.
                    </p>
                </div>

                <div className="mb-10 p-6 bg-gray-100 rounded-lg shadow-sm">
                    <h2 className="text-2xl font-semibold mb-6 text-black transition duration-300 hover:scale-95 cursor-pointer hover:text-blue-600">
                        5. Limitation of Liability
                    </h2>
                    <p className="mb-4 text-lg">
                        We are not liable for any damages arising from the use of our platform, including any loss of data or profits.
                    </p>
                </div>

                <p className="text-sm text-gray-600">
                    Last updated: October 13, 2024
                </p>
            </section>
            <Footer />
        </>
    );
};

export default TermsAndConditions;
