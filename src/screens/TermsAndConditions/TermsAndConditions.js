import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  TextBig,
  TextBigger,
  TextNormal,
} from '../../components/common/CustomText';
import CustomWrapper from '../../components/wrapper/CustomWrapper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../utils/constants/theme';
import {BackButton} from '../../components/common/CustomSvgItems';

const TermsAndConditions = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView edges={['top', 'bottom']}>
      <View
        style={{
          paddingVertical: hp(1),
          borderBottomWidth: 0.5,
          borderColor: '#DADADA',
          paddingHorizontal: wp(4),
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.goBack()}
          style={{
            alignItems: 'center',
            borderColor: '#C9C9C9',
            borderWidth: 1,
            height: wp(14),
            aspectRatio: 1,
            borderRadius: hp(10),
            justifyContent: 'center',
            backgroundColor: COLORS.backgroundColor,
          }}>
          <BackButton containerStyle={{marginLeft: wp(-0.5)}} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TextNormal
          textStyle={{paddingHorizontal: wp(4), marginBottom: hp(10)}}>
          <TextBigger>LiliNetworks LLC End-User License Agreement</TextBigger>
          {'\n'}
          {'\n'}
          <TextBig>
            This End-User License Agreement is a legal contract between you and
            Lili Networks LLC governing your use of LiliPad and any
            user-generated content you submit. By using the App, you agree to be
            bound by this Agreement.
          </TextBig>
          {'\n'}
          {'\n'}
          <TextBig>1. User-Generated Content{'\n'}</TextBig>
          {'\n'}
          <TextNormal bold>1.1.</TextNormal> By submitting any content,
          including but not limited to text, images, videos, or any other
          materials ("Content"), you grant LiliPad a non-exclusive,
          royalty-free, perpetual, irrevocable, and fully sublicensable right to
          use, reproduce, modify, adapt, publish, translate, create derivative
          works from, distribute, and display the Content in any form, media, or
          technology.{'\n'}
          <TextNormal bold>1.2.</TextNormal> You represent and warrant that you
          own or have the necessary rights, licenses, consents, and permissions
          to grant LiliPad the rights to your Content as described in this
          Agreement.{'\n'}
          <TextNormal bold>1.3.</TextNormal> You agree not to submit any Content
          that is unlawful, defamatory, libelous, threatening, pornographic,
          obscene, or otherwise objectionable, or that infringes on any third
          party's intellectual property rights.{'\n'}
          {'\n'}
          <TextBig>2. Data Collection and Privacy</TextBig>
          {'\n'}
          {'\n'}
          <TextNormal bold>2.1.</TextNormal> LiliPad collects typical data to
          create an account, including but not limited to your name, email
          address, and profile information. By using LiliPad, you consent to the
          collection, use, and disclosure of your personal information as
          described in our Privacy Policy.{'\n'}
          <TextNormal bold>2.2.</TextNormal> The App may use your data to
          provide personalized content and improve the App's features.{'\n'}
          {'\n'}
          <TextBig>3. Termination</TextBig>
          {'\n'}
          {'\n'}
          <TextNormal bold>3.1.</TextNormal>3.1. We reserve the right to
          terminate or suspend your account and access to the App if you violate
          this Agreement or engage in any conduct that we believe is harmful to
          the App or other users.{'\n'}
          <TextNormal bold>3.2.</TextNormal> Upon termination, the rights and
          licenses granted to LiliPad concerning your Content will survive.
          {'\n'}
          {'\n'}
          <TextBig>4. Indemnification</TextBig>
          {'\n'}
          {'\n'}
          You agree to indemnify and hold LiliPad, its affiliates, and their
          respective officers, directors, employees, and agents harmless from
          and against any claims, liabilities, damages, losses, and expenses,
          including reasonable attorneys' fees, arising out of or in any way
          connected with your use of the App or your violation of this
          Agreement.{'\n'}
          {'\n'}
          <TextBig>5. Governing Law</TextBig>
          {'\n'}
          {'\n'}
          This Agreement is governed by and construed by the laws of the United
          States without regard to its conflict of law principles.{'\n'}
          By using LiliPad, you acknowledge that you have read, understood, and
          agree to be bound by this Agreement. If you do not agree to this
          Agreement, you should not use LiliPad.{'\n'}
          This Agreement was last updated on December 4, 2023{'\n'}
          {'\n'}
          <TextBig>Lili Networks LLC</TextBig>
          {'\n'}
          <TextBig>15 Broad St</TextBig>
          {'\n'}
          <TextBig>New York 10005-1923</TextBig>
          {'\n'}
          <TextBig>United States</TextBig>
          {'\n'}
        </TextNormal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditions;

const styles = StyleSheet.create({});
