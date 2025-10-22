import { Text, View } from 'react-native';

import { textStyles } from '../../../constants/Fonts';
import { partyTabStyles } from './PartyTab.styles';

export default function PartyTab() {
  return (
    <View style={partyTabStyles.container}>
      <Text style={[textStyles.h3, { color: '#687076' }]}>파티를 만들 준비 중!</Text>
      <Text style={[textStyles.body, { color: '#9BA1A6' }]}>친구들과 함께 라이딩을 계획해보세요.</Text>
    </View>
  );
}
