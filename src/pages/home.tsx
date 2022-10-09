import { observer } from 'mobx-react-lite';
import { initializeStore, IStore, useStore } from '../stores';
import { GetServerSideProps } from 'next';
import { getSnapshot } from 'mobx-state-tree';
import env from '../../env';

const Home = () => {
  const store = useStore();
  const { fooModel, barModel } = store;

  const handleFooClick = () => {
    fooModel.addCount();
  };

  const handleBarClick = () => {
    barModel.addCount();
  };

  console.log('rendering');

  return (
    <div className='p-4'>
      <div className='flex gap-4 mb-4'>
        <div>
          <button
            className='bg-sky-200 opacity-90 py-1 px-2 rounded-lg text-sky-900 hover:opacity-100'
            onClick={handleFooClick}
          >
            fooSet
          </button>
        </div>
        <div>
          <button
            className='bg-pink-200 opacity-90 py-1 px-2 rounded-md text-pink-900 hover:opacity-100'
            onClick={handleBarClick}
          >
            barSet
          </button>
        </div>
      </div>
      <div>foo fooVal: {fooModel.fooVal}</div>
      <div>foo count: {fooModel.count}</div>
      <div>bar count: {barModel.count}</div>
    </div>
  );
};

export default observer(Home);

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('server side: ', env.MY_VAL);

  const store = initializeStore({
    fooModel: {
      fooVal: 'test11',
    },
  });
  store.fooModel.setCount(3);

  const initialState = getSnapshot<IStore>(store);

  console.log('initialState', initialState);

  return {
    props: {
      initialState,
    },
  };
};
