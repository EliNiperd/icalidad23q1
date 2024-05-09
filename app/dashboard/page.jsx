import Layout from './layout';
import { nunito } from '../ui/fonts'

const DashboardPage = () => {
    return (
        <Layout>
            <main>
                <h1 className={`${nunito.className} mb-4 text-xl md:text-2xl`}>
                    Dashboard
                </h1>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

                </div>
            </main>
        </Layout>
    );
};

export default DashboardPage;
