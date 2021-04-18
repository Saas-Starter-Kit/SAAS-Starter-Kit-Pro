import { useRouter } from 'next/router';

const getOrgId = () => {
  const location = useRouter();
  const splitPath = location.asPath.split('/');
  const org_id = splitPath[2];
  return org_id;
};

export default getOrgId;
