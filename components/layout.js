import Image from 'next/image';
import Link from 'next/link';


export default function Layout({ children }) {
  return (
    <div className='flex flex-col min-h-screen relative'>
      <header className='bg-slate-200 mb-8 py-4 fixed top-0 left-0 right-0'>
        <div className='container mx-auto flex justify-center'>
          <Link className='mx-auto flex' href='/'>
            <Image src="/images/k8s.png" width={30} height={30}/>            
            <b style={{fontSize: 20, marginLeft: 10}}>
                K8S Translation
            </b>
          </Link>
        </div>
      </header>
      <main className='container mx-auto flex-1' style={{marginTop: "80px"}}>{children}</main>
      <footer className='mt-8 py-4'>
        <div className='container mx-auto flex justify-center'>
          &copy; 2022 LHU
        </div>
      </footer>
    </div>
  );
}