export interface Business {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  url: string;
  color: string;
  features?: Array<{
    title: string;
    description: string;
  }>;
}

export const BUSINESSES: Business[] = [
  {
    name: "Cluster Builds",
    slug: "cluster-builds",
    tagline: "The AI Brain for Custom PC Building",
    description:
      "AI-driven ecommerce platform that revolutionizes custom PC building with intelligent recommendations, real-time compatibility checking, and data-driven insights.",
    longDescription:
      "Cluster Builds is transforming the PC building experience through advanced artificial intelligence and machine learning. Our platform combines an intelligent recommendation engine (ClusterAI) with real-time pricing, compatibility analysis, and performance prediction. Users get budget-optimized builds, FPS estimates, bottleneck detection, and AI-powered compatibility fixes. We aggregate data from hardware retailers, benchmark databases, and community insights to provide the most comprehensive PC building platform. With features like resale value estimation, thermal performance prediction, and personalized build optimization, Cluster Builds becomes the go-to platform for everyone from first-time builders to enthusiasts and professionals.",
    url: "https://example.com/cluster-builds",
    color: "hsl(16 88% 53%)",
    features: [
      {
        title: "Budget-Optimized Builds",
        description: "AI-powered recommendations based on your budget, use case, and performance needs. Get the best price-to-performance ratio.",
      },
      {
        title: "Component Compatibility",
        description: "Intelligent compatibility checking across CPU, GPU, RAM, PSU, and cases. Never miss a critical incompatibility.",
      },
      {
        title: "Performance Prediction",
        description: "Estimated FPS, rendering times, and benchmark performance based on real-world data and ML models.",
      },
      {
        title: "Intelligent Recommendations",
        description: "ClusterAI learns from your choices and suggests components that work perfectly together, optimized for your needs.",
      },
    ],
  },
  {
    name: "Cluster Cloud",
    slug: "cluster-cloud",
    tagline: "Distributed Infrastructure for AI",
    description:
      "Cloud infrastructure platform optimized for AI workloads, enabling enterprises to deploy, scale, and manage machine learning applications globally.",
    longDescription:
      "Cluster Cloud provides enterprise-grade cloud infrastructure specifically designed for AI and machine learning workloads. Our distributed computing platform offers GPU acceleration, seamless scalability, and global data center presence. We enable organizations to run complex AI models, data pipelines, and analytics at scale with minimal latency and maximum reliability. From training large language models to running inference at scale, Cluster Cloud handles it all with built-in optimization, auto-scaling, and cost efficiency.",
    url: "https://example.com/cluster-cloud",
    color: "hsl(30 100% 65%)",
    features: [
      {
        title: "GPU-Accelerated Computing",
        description: "Enterprise-grade GPUs for high-performance AI training and inference at scale across global data centers.",
      },
      {
        title: "Auto-Scaling Infrastructure",
        description: "Automatic resource allocation that scales instantly based on your workload demands, optimizing costs.",
      },
      {
        title: "Low-Latency Deployment",
        description: "Global edge network ensuring minimal latency for real-time AI applications and data processing.",
      },
      {
        title: "Enterprise Reliability",
        description: "99.99% uptime SLA with redundancy, disaster recovery, and dedicated support for mission-critical workloads.",
      },
    ],
  },
];

export function getBusinessBySlug(slug: string): Business | undefined {
  return BUSINESSES.find((b) => b.slug === slug);
}
