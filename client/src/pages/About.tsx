import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Heart, Sparkles } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function About() {
  const achievements = [
    {
      icon: <Star className="w-6 h-6" />,
      title: "Expert Tarot Reader",
      description: "Over a decade of experience in spiritual guidance",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certified Practitioner",
      description: "Multiple certifications in Vedic sciences",
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Spiritual Healer",
      description: "Helping thousands find their path",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Varanasi Heritage",
      description: "Rooted in the spiritual capital of India",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF]">
      {/* Hero Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-100/30 to-orange-100/30 opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent mb-6">
              About Divine Vaani
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Empowering lives through ancient wisdom and spiritual guidance
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-[#FF7E1D]/20 rounded-3xl transform rotate-3" />
              <img
                src="/images/tarot-priyanka-singh.png"
                alt="Tarot Priyanka Singh"
                className="relative rounded-3xl shadow-2xl transform hover:-rotate-2 transition-transform duration-500 max-w-md mx-auto"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                Meet Our Founder & CEO
              </h2>
              <h3 className="text-2xl font-semibold text-purple-600">
                Tarot Priyanka Singh
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Born and raised in the spiritual heart of India, Varanasi,
                Priyanka Singh brings a profound understanding of ancient wisdom
                to modern-day spiritual guidance. As a gifted tarot reader and
                deeply spiritual practitioner, she has dedicated her life to
                helping others find clarity, purpose, and divine connection.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                With her extensive knowledge of Vedic sciences and spiritual
                practices, Priyanka has transformed countless lives through her
                intuitive readings and compassionate guidance. Her unique
                approach combines traditional wisdom with contemporary
                understanding, making spiritual insights accessible to all.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-sm hover:-translate-y-2">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600 to-[#FF7E1D] p-4 text-white">
                      {achievement.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                      {achievement.title}
                    </h3>
                    <p className="text-gray-600">{achievement.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
