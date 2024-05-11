import Image from "next/image";
import Navbar from "@/components/navbar";
import Button from "@/components/button";

export default function Home() {
  return (
    <main className="flex flex-col">
      <div>
        <Navbar />
        <div className="flex flex-col p-10 text-center">
          <h1 className="text-4xl font-bold">Organize and plan events!</h1>
          <p className="text-lg mt-4 ">
            {
              "Choose a date, time, and location for your event. Invite your friends and family to join you. Share your event on social media. Let's meet!"
            }
          </p>

          <div className="flex justify-center mt-10">
            <Image
              src="/social_icon.svg"
              alt="Social Icon"
              width={400}
              height={400}
            />
          </div>
          <div className="text-center p-10">
            <Button title="Get Started" color="white" />
          </div>
        </div>
      </div>
    </main>
  );
}
