import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { COLORS, SIZES } from '../../../constants';
import PopularJobCard from '../../common/cards/popular/PopularJobCard';
import useFetch from '../../../hook/useFetch';

import styles from './popularjobs.style';

const Popularjobs = () => {
  const router = useRouter();

  const [selectedJob, setSelectedJob] = useState();

  const { data, error, isLoading, refetch } = useFetch('search', {
    query: 'React developer',
    num_pages: 1,
  });

  const handleCardPress = (item) => {
    router.push(`/job-details/${item.job_id}`);
    setSelectedJob(item.job_id);
  };

  console.log(data.length, 'DATA POPULAR JOB ?????');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular jobs</Text>
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
          <FlatList
            keyExtractor={(item) => item?.job_id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
            data={data}
            renderItem={({ item }) => {
              return (
                <PopularJobCard
                  item={item}
                  handleCardPress={handleCardPress}
                  selectedJob={selectedJob}
                />
              );
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
