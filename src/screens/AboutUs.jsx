import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import TopHeader from '../components/TopHeader';
import CustomText from '../components/CustomText';

const AboutUsScreen = () => {
  return (
    <View className="flex-1 ">
      <TopHeader title="About Us" />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <CustomText font="extraBold" style={styles.title}>
            About Us
          </CustomText>

          <CustomText font="extraBold" style={styles.heading}>
            Who We Are
          </CustomText>
          <CustomText style={styles.CustomText}>
            TubeTool app is a passionate team of creators and new age
            tech-developers aimed at helping YouTubers of all levels to achieve
            their channel goals. Tubetool understands the challenges faced by
            every YouTubers, from creating engaging content to attracting new
            viewers and making a loyal subscriber base.
          </CustomText>

          <CustomText style={styles.heading} font="extraBold">
            Our Mission
          </CustomText>
          <CustomText style={styles.CustomText}>
            Tubetool believes YouTube has the potential to entertain, educate,
            and inspire the audience in the right way. Our mission is to become
            a growth partner for every content creator on YouTube by providing
            them new generation innovative tools and resources that can help
            them to create better content, reach wider audiences, and build a
            loyal audience base.
          </CustomText>

          <CustomText style={styles.heading} font="extraBold">
            What We Offer
          </CustomText>
          <CustomText style={styles.CustomText}>
            TubeTool.ai offers various innovative tools that help content
            creators to boost their channel performances. Some of these are:
          </CustomText>
          <CustomText style={styles.bulletPoint}>
            ● Keyword Research: This tool helps content creators to discover
            high-performing keywords and suggests some video ideas according to
            their channel performance and audience interests.
          </CustomText>
          <CustomText style={styles.bulletPoint}>
            ● Content Ideation: This tool helps to create and research the best
            content for their next video.
          </CustomText>
          <CustomText style={styles.bulletPoint}>
            ● Title & Description Guide Tool: This tool is developed to provide
            you with well SEO optimized titles, short descriptions, tags, and
            hashtags to increase your video performances.
          </CustomText>
          <CustomText style={styles.bulletPoint}>
            ● Video Audit & Analysis: This tool provides valuable insights into
            their video performance, helps in video optimization, and identifies
            areas for improvement.
          </CustomText>
          <CustomText style={styles.CustomText}>
            Along with these tools, Tubetool provides many other tools that are
            mentioned on our app homepage.
          </CustomText>

          <CustomText style={styles.heading} font="extraBold">
            Why Choose TubeTool App?
          </CustomText>
          <CustomText style={styles.CustomText}>
            Tools offered by us are developed by our team having extensive
            experience in the content creation field and we understand the every
            need of YouTubers. We follow a data-driven approach to develop our
            tools. We offer a user-friendly and easy-to-use interface which is
            suitable for every stage of content creators. We are constantly
            innovating and adding new features to improve our services to meet
            your needs.
          </CustomText>
          <View>
            <CustomText style={styles.CustomText}>
              You can reach us at : contact@tubetool.ai for more details and
              information.
            </CustomText>
          </View>
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
    color: 'rgba(0,0,0,0.5)',
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 16,
    color: 'rgba(0,0,0,0.5)',
  },
});

export default AboutUsScreen;
