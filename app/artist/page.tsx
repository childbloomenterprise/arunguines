import { BookingLink } from "../booking-link";
import { PageSchema } from "../page-schema";
import { ArrowUpRight } from "../icons";
import { createPageMetadata, performerKeywords } from "../seo";
import { PageFrame, PageHero, SectionHeading } from "../site-components";
import { profileVideo } from "../site-data";
import { VideoPlayer } from "../video-player";

const description = "Meet Arun Guinness, a singer, voice artist and live entertainer bringing music and familiar voices to Malayali communities worldwide.";
export const metadata = createPageMetadata({ title: "Meet Arun Guinness", description, path: "/artist", keywords: performerKeywords });

export default function ArtistPage() {
  return <PageFrame>
    <PageSchema path="/artist" name="About Arun Guinness" description={description} type="AboutPage" />
    <PageHero variant="artist" label="Meet Arun" title="The man behind" accent="the voices." description="Arun Guinness is a singer and voice artist based in Kochi, Kerala." highlights={[]} media={<VideoPlayer id={profileVideo.id} title={profileVideo.title} alt="Arun Guinness in his official profile film" sizes="(max-width: 800px) calc(100vw - 40px), 500px" ratio="16:9" eager />} />
    <section className="artist-story section-shell"><SectionHeading label="About Arun" title="Music, mimicry" accent="and a room full of smiles." /><div><p className="lead">Arun performs songs and familiar playback voices live for audiences in India and abroad.</p><BookingLink className="button button-brass">Check Availability <ArrowUpRight /></BookingLink></div></section>
  </PageFrame>;
}
