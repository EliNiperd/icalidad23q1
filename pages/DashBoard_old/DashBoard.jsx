import HomeDashBoard from '.';

const DashBoard = ({ props }) => {
  return (
    <HomeDashBoard>
      <title className="text-lg font-bold">{props.title}</title>
      <div className="w-32 h-56 bg-slate-600">DashBoard Principal</div>
    </HomeDashBoard>
  );
};

export const getServerSideProps = async () => {
  return {
    props: {
      title: 'DashBoard',
    },
  };
};

export default DashBoard;
