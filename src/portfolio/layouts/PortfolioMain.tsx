import DemoPreview from '../components/main/DemoPreview';
import DeveloperInfo from '../components/main/DeveloperInfo';
import SidebarProps from '../components/props/main/SidebarProps';

type FooterNavPropsType = {
  dataIndex: number;
  dataStatus: string;
};

const DeveloperInformation = ({ dataIndex, dataStatus }: FooterNavPropsType) => {
  return (
    <section className="demoSection" data-index={dataIndex} data-status={dataStatus}>
      <DeveloperInfo />
      <aside className="sidebar" aria-label="Project Information">
        <SidebarProps description="This portfolio and its projects were crafted without the aid of component libraries. This portfolio utilizes Vite, React, TypeScript, a Prettier/ESLint combo with AIRBNB config, BEM methodology, and Sass." />
      </aside>
    </section>
  );
};

const EcommerceDemo = ({ dataIndex, dataStatus }: FooterNavPropsType) => {
  return (
    <section className="demoSection" data-index={dataIndex} data-status={dataStatus}>
      <DemoPreview />
      <aside className="sidebar" aria-label="Project Information">
        <SidebarProps description="Ecommerce placeholder" />
      </aside>
    </section>
  );
};

const DevDemo = () => {
  return (
    <section>
      <main className="developmentDemo">
        <DeveloperInformation dataIndex={0} dataStatus="active" />
        <EcommerceDemo dataIndex={1} dataStatus="inactive" />
      </main>
    </section>
  );
};

export default DevDemo;
