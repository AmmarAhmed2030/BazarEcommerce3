// components/CustomLink.js
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { setLoading } from '@/redux/slices/loadingSlice';

const CustomLink = ({ href, children, className = ' ' }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleClick = (e) => {
    dispatch(setLoading(true));
    e.preventDefault();
    router.push(href);
    dispatch(setLoading(false));
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
};

export default CustomLink;
