import { Button } from "./ui/button";

const Hero = () => {
    return (
        <section className="h-[60vh] lg:h-[80vh] bg-[url(/assets/hero/bg.jpg)] bg-cover bg-center bg-no-repeat">
            <div className="container mx-auto h-full flex justify-center items-center">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="h1 text-white text-center max-w-[800px] mb-8">
                        Experience hospitality at its finest
                    </h1>
                    <Button
                        size="lg"
                        variant={"primary"}
                        className="rounded-none"
                    >
                        Discover more
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
