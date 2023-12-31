import type { ExplorePublicationRequest, Publication } from '@lenster/lens';
import {
  CustomFiltersTypes,
  PublicationSortCriteria,
  useExploreFeedQuery
} from '@lenster/lens';
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Dimensions, View } from 'react-native';

import SinglePublication from '~/components/Publication/SinglePublication';
import Divider from '~/components/UI/Divider';
import tw from '~/lib/tailwind';

const styles = {
  container: tw.style('flex-1 bg-black', {
    minHeight: Dimensions.get('screen').height
  })
};

const Timeline = () => {
  const request: ExplorePublicationRequest = {
    sortCriteria: PublicationSortCriteria.CuratedProfiles,
    limit: 50,
    noRandomize: false,
    customFilters: [CustomFiltersTypes.Gardeners]
  };

  const { data } = useExploreFeedQuery({
    variables: { request }
  });

  const publications = data?.explorePublications?.items as Publication[];

  return (
    <View style={styles.container}>
      <FlashList
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => {
          return <SinglePublication publication={item} style="m-5" />;
        }}
        estimatedItemSize={50}
        data={publications}
      />
    </View>
  );
};

export default Timeline;
