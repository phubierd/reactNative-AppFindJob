import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constants';
import useFetch from '../../../hook/useFetch';
import NearbyJobCard from '../../common/cards/nearby/NearbyJobCard';

import styles from './nearbyjobs.style';

const Nearbyjobs = () => {
  const router = useRouter();

  const { data, error, isLoading, refetch } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });

  console.log(data.length, 'DATA NEARBY JOB ???');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        ) : (
          //  : error ? (
          //   <Text>Somthing went wrong</Text>
          // )
          data?.map((job) => {
            return (
              <NearbyJobCard
                key={`near-by-${job?.job_id}`}
                job={job}
                handleNavigate={() => router.push(`/job-details/${job.job_id}`)}
              />
            );
          })
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
