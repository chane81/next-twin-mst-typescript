import { observer } from 'mobx-react-lite';
import { initializeStore, IStore, useStore } from '../stores';
import { GetServerSideProps } from 'next';
import { getSnapshot } from 'mobx-state-tree';
import tw, { styled } from 'twin.macro';
import { Button } from '../components/Button';
import env from '../../env';
import Image from 'next/image';

const BtnA = styled.button`
  ${tw`border-2 border-blue-300 p-2`}
`;

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
    <>
      <div>
        <button className='btn74'>test</button>
        <BtnA>11</BtnA>
      </div>
      <div className='md:flex m-12 bg-gray-100 rounded-xl p-8 md:p-0'>
        <img
          className='md:w-96 border-2 md:w-36 md:h-56 sm:w-64 sm:h-80 lg:ml-0 lg:rounded-l-2xl md:rounded-none rounded-full mx-auto'
          src='https://tailwindcss.com/_next/static/media/sarah-dayan.a8ff3f1095a58085a82e3bb6aab12eb2.jpg'
        />
        <div tw='pt-6 md:flex-1 md:p-8 text-center md:text-left space-y-4'>
          <blockquote>
            <p tw='text-lg font-semibold'>
              “Tailwind CSS is the only framework that I've seen scale on large
              teams. It’s easy to customize, adapts to any design, and the build
              size is tiny.”
            </p>
          </blockquote>
          <div className='font-medium'>
            <div tw='text-blue-600'>Sarah Dayan</div>
            <div tw='text-gray-500'>Staff Engineer, Algolia</div>
          </div>
        </div>
      </div>
      <div className='flex md:flex-row m-12 bg-gray-100 rounded-xl md:p-0 sm:p-4 sm:flex-col'>
        <div className='md:w-36 sm:w-60 md:h-60 sm:h-72 sm:mx-auto rounded-l-2xl relative'>
          <Image
            src='https://tailwindcss.com/_next/static/media/sarah-dayan.a8ff3f1095a58085a82e3bb6aab12eb2.jpg'
            alt=''
            className='lg:rounded-l-2xl md:rounded-l-2xl md:rounded-r-none sm:rounded-full'
            layout='fill'
            objectFit='fill'
          />
        </div>
        <div
          tw='pt-6 
          flex-1
          md:p-8 text-center md:text-left space-y-4'
        >
          <blockquote>
            <p tw='text-lg font-semibold'>
              “Tailwind CSS is the only framework that I've seen scale on large
              teams. It’s easy to customize, adapts to any design, and the build
              size is tiny.”
            </p>
          </blockquote>
          <div tw='font-medium'>
            <div tw='text-blue-600'>Sarah Dayan</div>
            <div tw='text-gray-500'>Staff Engineer, Algolia</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default observer(Home);

export const getServerSideProps: GetServerSideProps = async () => {
  console.log('server side: ', env.MY_VAL);

  const store = initializeStore({
    fooModel: {
      fooVal: 'test11'
    }
  });
  store.fooModel.setCount(3);

  const initialState = getSnapshot<IStore>(store);

  console.log('initialState', initialState);

  return {
    props: {
      initialState
    }
  };
};
