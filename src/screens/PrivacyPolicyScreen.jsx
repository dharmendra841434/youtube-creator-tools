import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import TopHeader from '../components/TopHeader';
import CustomText from '../components/CustomText';

const PrivacyPolicyScreen = () => {
  return (
    <View className="flex-1 ">
      <TopHeader title="Privacy Policy" />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <CustomText font="extraBold" style={styles.title}>
            Privacy Policy
          </CustomText>
          <CustomText style={styles.subtitle}>
            Effective Date: 02/06/2024
          </CustomText>

          <CustomText style={styles.heading} font="extraBold">
            1. Introduction
          </CustomText>
          <CustomText style={styles.CustomText}>
            Welcome to Tubetool app. Your privacy is important to us. This
            Privacy Policy explains how we collect, use, disclose, and safeguard
            your information when you use our App. By using the App, you agree
            to the collection and use of information in accordance with this
            policy.
          </CustomText>

          <CustomText style={styles.heading} font="extraBold">
            2. Information Collection
          </CustomText>
          <CustomText style={styles.CustomText}>
            We do not collect any personally identifiable information (PII) from
            our users.
          </CustomText>

          <CustomText style={styles.heading} font="extraBold">
            3. AdMob Advertising
          </CustomText>
          <CustomText style={styles.CustomText}>
            Our App uses AdMob, a mobile advertising service provided by Google
            Inc. AdMob may collect and use data to show personalized ads to you.
            Please review AdMob's privacy policy to understand what data is
            collected and how it is used: AdMob Privacy Policy
          </CustomText>

          <CustomText style={styles.heading} font="extraBold">
            4. Use of Information
          </CustomText>
          <CustomText style={styles.CustomText}>
            Since we do not collect any personal data, we do not use or share
            any personal information.
          </CustomText>

          <CustomText style={styles.heading} font="extraBold">
            5. Third-Party Services
          </CustomText>
          <CustomText style={styles.CustomText}>
            Our App may contain links to third-party websites or services, such
            as YouTube. We are not responsible for the privacy practices or the
            content of these third parties. Please review the privacy policies
            of these third parties directly.
          </CustomText>

          <CustomText style={styles.heading} font="extraBold">
            6. Data Security
          </CustomText>
          <CustomText style={styles.CustomText}>
            We strive to use commercially acceptable means to protect your
            non-personal information. However, no method of transmission over
            the internet or method of electronic storage is 100% secure.
          </CustomText>

          <CustomText style={styles.heading} font="extraBold">
            7. Children's Privacy
          </CustomText>
          <CustomText style={styles.CustomText}>
            Our App does not address anyone under the age of 13. We do not
            knowingly collect personal information from children under 13.
          </CustomText>

          <CustomText style={styles.heading} font="extraBold">
            8. Changes to This Privacy Policy
          </CustomText>
          <CustomText style={styles.CustomText}>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by posting the new Privacy Policy on this page.
          </CustomText>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,

    marginBottom: 12,
    color: 'rgba(0,0,0,0.8)',
  },
  subtitle: {
    fontSize: 16,

    marginBottom: 8,
    color: 'rgba(0,0,0,0.8)',
  },
  heading: {
    fontSize: 20,

    marginTop: 12,
    marginBottom: 6,
    color: 'rgba(0,0,0,0.8)',
  },
  CustomText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: 'rgba(0,0,0,0.6)',
  },
});

export default PrivacyPolicyScreen;
