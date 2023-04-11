import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import firebase from '../helpers/firebaseauth';

const withAuth = (WrappedComponent) => {
  const HOC = () => {
    const auth = getAuth();
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          // Redirect to login page if user is not authenticated
          router.replace('/login');
        }
      });

      return () => {
        unsubscribe(); // Unsubscribe from onAuthStateChanged listener on component unmount
      };
    }, []);

    return <WrappedComponent />;
  };

  return HOC;
};

export default withAuth;
