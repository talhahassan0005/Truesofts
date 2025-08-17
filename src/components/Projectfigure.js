'use client';

import { motion } from 'framer-motion';

function StatisticCard({ number, label, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative bg-white/10 backdrop-blur-md border-l-4 border-white/50 p-8 md:p-10"
      style={{ minHeight: '140px' }}
    >
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 leading-none">
        {number}+
      </div>
      <p className="text-base md:text-lg text-white/90 font-medium">{label}</p>
    </motion.div>
  );
}

export default function ProjectFigure({id}) {
  const statistics = [
    { number: 200, label: 'Successful projects' },
    { number: 197, label: 'Satisfied clients' },
    { number: 15, label: 'Team Members' },
    { number: 17, label: 'Years of experience' },
  ];

  return (
    <section className="relative py-20 overflow-hidden" id={id}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
        }}
      />

      {/* Dark Blue Overlay */}
      <div className="absolute inset-0 bg-blue-900/70" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left max-w-lg mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-white">
            We Are <span className="text-white">TrueSofts</span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-9xl mx-auto">
          {statistics.map((stat, index) => (
            <StatisticCard
              key={index}
              number={stat.number}
              label={stat.label}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
