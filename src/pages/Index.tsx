
import React from 'react';
import Layout from '../components/Layout';
import Timeline from '../components/Timeline';
import ChatInterface from '../components/ChatInterface';
import { Atom, MessageCircle, Accessibility } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10">
              <Atom className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight animate-fade-in">
              Discover Nuclear History
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-slide-up">
              Explore the fascinating history of nuclear fission and energy in the United States through an interactive timeline and AI-powered chat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <a href="#timeline" className="button-primary">
                Explore Timeline
              </a>
              <a href="#chat" className="button-secondary">
                Ask Questions
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Overview */}
      <section className="py-12 bg-secondary/30">
        <div className="container px-4 mx-auto">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="glass-panel p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Atom className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Interactive Timeline</h3>
              <p className="text-muted-foreground">
                Explore key events, discoveries, and policies that shaped nuclear history in the United States.
              </p>
            </div>
            
            <div className="glass-panel p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Assistant</h3>
              <p className="text-muted-foreground">
                Ask questions and get detailed answers about any aspect of nuclear fission and energy history.
              </p>
            </div>
            
            <div className="glass-panel p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Accessibility className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-muted-foreground">
                Designed for everyone with text sizing, high contrast mode, and voice narration options.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <Timeline />
      
      {/* Chat Interface */}
      <ChatInterface />
      
      {/* About Section */}
      <section id="about" className="py-12">
        <div className="container px-4 mx-auto">
          <div className="glass-panel p-6 md:p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">About This Project</h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p>
                The <strong>Ask and Learn about Nuclear Fission and Energy</strong> application is designed to provide an engaging and interactive learning experience about the history and impact of nuclear fission in the United States.
              </p>
              <p>
                Our goal is to make this complex subject accessible to a broad audience, including students, educators, industry professionals, and anyone with an interest in science and history.
              </p>
              <p>
                The application features an interactive timeline of key events, an AI-powered chat interface for questions, and comprehensive accessibility features to ensure everyone can engage with the content.
              </p>
              <p>
                This is an educational resource that aims to present historical facts accurately and objectively, with information based on reputable academic and governmental sources.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
