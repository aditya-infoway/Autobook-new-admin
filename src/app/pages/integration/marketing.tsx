import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  VideoCameraIcon,
  PhotoIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  CalendarIcon,
  ChevronRightIcon,
  BellIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  DocumentDuplicateIcon,
  SparklesIcon,
  GiftIcon,
  ClockIcon,
  CheckCircleIcon,
  PencilIcon,
  TrashIcon,
  StarIcon,
  TrophyIcon,
  FireIcon,
  RocketLaunchIcon,
  UserGroupIcon,
  AcademicCapIcon,
  MapPinIcon,
  PhoneIcon,
  BoltIcon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function Marketing() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dummy data for templates
  const templates: any[] = [];

  // Add this function to handle file upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Add this function to trigger file input click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Data for the "Ready Template" section
  const readyTemplates = [
    {
      id: 1,
      title: "CONGRATULATIONS",
      subtitle: "Your dedication and excellence shine brighter than gold",
      tagline: "We are proud of your remarkable achievement!",
      badge: null,
      bgColor: "bg-slate-900",
      theme: "dark",
      dealershipName: "SHRI VINAYAK WHEELS PVT. LTD.",
      location: "Kudal",
      phone: "9423989781",
      hasImageUpload: true,
    },
    {
      id: 2,
      badge: "AWARD+",
      title: "EXCELLENCE AWARD",
      heading: "Top Performer of the Month",
      subtitle:
        "Your dedication and excellence shine brighter than gold. We are proud of your remarkable achievement!",
      bgColor:
        "bg-gradient-to-b from-neutral-900 via-amber-950/40 to-neutral-900",
      theme: "gold",
      dealershipName: "BN THAKUR SUZUKI",
      website: "www.suzukimotorcycleGOA",
      phone: "8879941296",
    },
    {
      id: 3,
      badge: "MILESTONE*",
      heading: "Great Achievement!",
      title: "You Did It!",
      subtitle: "RECORD BREAKING SALES",
      tagline:
        "Your passion, persistence and performance have set a new benchmark. The entire Suzuki family celebrates your success!",
      bgColor: "bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100",
      theme: "light",
      dealershipName: "BN THAKUR SUZUKI",
      website: "www.suzukimotorcycleGOA",
      phone: "8879941296",
    },
  ];

  // Dummy data for stats
  const stats = [
    {
      id: 1,
      label: "My Templates",
      value: "24",
      icon: DocumentDuplicateIcon,
      color: "text-blue-600 bg-blue-50 dark:bg-blue-900/30",
    },
    {
      id: 2,
      label: "WhatsApp Shares",
      value: "156",
      icon: FaWhatsapp,
      color: "text-green-600 bg-green-50 dark:bg-green-900/30",
    },
    {
      id: 3,
      label: "Downloads",
      value: "89",
      icon: ArrowDownTrayIcon,
      color: "text-purple-600 bg-purple-50 dark:bg-purple-900/30",
    },
  ];

  // Feature cards data
  const featureCards = [
    {
      id: 1,
      title: "Festival Templates",
      description:
        "Ready-to-use festival wishes and greeting templates for your customers",
      icon: SparklesIcon,
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      textColor: "text-orange-600 dark:text-orange-400",
    },
    {
      id: 2,
      title: "Birthday Wishes",
      description:
        "Create personalized birthday cards for your valued customers",
      icon: GiftIcon,
      color: "from-pink-400 to-purple-500",
      bgColor: "bg-pink-50 dark:bg-pink-900/20",
      textColor: "text-pink-600 dark:text-pink-400",
    },
    {
      id: 3,
      title: "Service Reminder",
      description:
        "Automate service reminders and manage follow-ups efficiently",
      icon: BellIcon,
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      id: 4,
      title: "Video Creator",
      description:
        "Create promotional videos for your automobile business easily",
      icon: VideoCameraIcon,
      color: "from-purple-400 to-indigo-500",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      textColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  const handleRefresh = () => {
    console.log("Refreshing data...");
  };

  const handleCreatePost = () => {
    console.log("Creating new post...");
  };

  const handleCreateVideo = () => {
    console.log("Creating new video...");
  };

  const handleCreateTemplate = () => {
    // Navigate to template editor page
    navigate("/integration/templateeditor");
  };

  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(search.toLowerCase()),
  );

  const CurvedText = ({
    text,
    color = "#fbbf24",
    id,
  }: {
    text: string;
    color?: string;
    id: string;
  }) => (
    <svg viewBox="0 0 300 100" className="mx-auto h-16 w-64 overflow-visible">
      <defs>
        <path id={id} d="M 20,85 A 130,130 0 0,1 280,85" fill="none" />
      </defs>
      <text
        fill={color}
        fontSize="16"
        fontWeight="700"
        letterSpacing="2"
        style={{ fontFamily: "Georgia, serif" }}
      >
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  );

  const TemplateFooter = ({
    name,
    location,
    phone,
  }: {
    name: string;
    location: string;
    phone: string;
  }) => (
    <div className="relative mt-auto flex items-center justify-between bg-[#133270] px-4 py-3">
      {/* Left Slanted White Container for Company Name */}
      <div className="relative -ml-4 flex items-center bg-white py-2.5 pr-8 pl-5 [clip-path:polygon(0_0,100%_0,82%_100%,0_100%)]">
        <p className="max-w-[170px] text-left text-[11px] leading-tight font-extrabold text-[#c40000] uppercase drop-shadow-sm">
          {name}
        </p>
      </div>

      {/* Right Section: Location & Phone */}
      <div className="flex items-center gap-3">
        {/* Location */}
        <div className="flex items-center gap-1.5 text-white">
          <MapPinIcon className="h-4 w-4 shrink-0 text-white" />
          <span className="text-sm font-bold tracking-wide">{location}</span>
        </div>

        {/* Pill-shaped Red Phone Button */}
        <div className="flex items-center gap-1.5 rounded-full bg-[#ff0000] px-4 py-1.5 text-white shadow-md">
          <PhoneIcon className="h-4 w-4 shrink-0 fill-current text-white" />
          <span className="text-sm font-black tracking-wide">{phone}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-6 dark:bg-gray-900">
      {/* Page Header */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Marketing Center
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Create stunning marketing posts & videos for your automobile
            business
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="rounded-lg border border-gray-200 bg-white p-2.5 text-gray-600 shadow-sm transition hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 shadow-xl md:p-8">
        <div className="absolute top-0 right-0 h-64 w-64 translate-x-1/3 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-48 w-48 translate-x-1/4 translate-y-1/2 rounded-full bg-blue-400/5 blur-2xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Create Stunning Marketing Posts & Videos
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-blue-100">
              Festival wishes, birthday cards, service reminders, WhatsApp
              creations and promotional videos for your automobile business.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={handleCreatePost}
                className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50 hover:shadow-lg"
              >
                <PhotoIcon className="h-5 w-5" />
                Create New Post
              </button>
              <button
                onClick={handleCreateVideo}
                className="flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/30"
              >
                <VideoCameraIcon className="h-5 w-5" />
                Create Video
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3 lg:w-auto">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-sm transition hover:bg-white/20"
                >
                  <div
                    className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg ${stat.color}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="text-lg font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-blue-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Marketing Flow */}
        <div className="relative z-10 mt-6 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
                <BoltIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">
                  QUICK MARKETING FLOW
                </h3>
                <p className="text-xs text-blue-100">
                  Upload Logo & Generate Ready Post in Seconds
                </p>
              </div>
            </div>
            <ChevronRightIcon className="h-5 w-5 text-white/60" />
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <div
                  className={`mb-3 inline-flex rounded-xl ${card.bgColor} p-2.5`}
                >
                  <Icon className={`h-6 w-6 ${card.textColor}`} />
                </div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                  {card.title}
                </h4>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {card.description}
                </p>
                <div className="mt-3 flex items-center gap-1 text-xs text-blue-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-blue-400">
                  <span>Get Started</span>
                  <ChevronRightIcon className="h-3 w-3" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Marketing Flow Steps */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-6 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Quick Marketing Flow
        </h3>
        <div className="relative flex flex-col items-center justify-between gap-4 md:flex-row">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              1
            </div>
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Select Template
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Choose from our templates
              </p>
            </div>
          </div>

          {/* Line with arrow */}
          <div className="hidden flex-1 md:block">
            <div className="relative h-0.5 w-full bg-blue-200 dark:bg-blue-800">
              <ChevronRightIcon className="absolute -top-2 -right-2 h-4 w-4 text-blue-400" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              2
            </div>
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Upload Logo
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Add your brand logo
              </p>
            </div>
          </div>

          {/* Line with arrow */}
          <div className="hidden flex-1 md:block">
            <div className="relative h-0.5 w-full bg-blue-200 dark:bg-blue-800">
              <ChevronRightIcon className="absolute -top-2 -right-2 h-4 w-4 text-blue-400" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              3
            </div>
            <div className="mt-2">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Download & Share
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Share across platforms
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* My Templates Section */}
      <div>
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            My Templates
          </h3>
          <div className="flex flex-col gap-3 sm:flex-row">
            {/* Search */}
            <div className="relative">
              <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-9 text-sm outline-none focus:border-blue-500 sm:w-64 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <button
              onClick={handleCreateTemplate}
              className="bg-primary-600 hover:bg-primary-700 flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition"
            >
              <PlusIcon className="h-4 w-4" />
              New Template
            </button>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* Create New Template Card */}
          <button
            onClick={handleCreateTemplate}
            className="group hover:border-primary-500 hover:bg-primary-50 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white p-6 transition dark:border-gray-600 dark:bg-gray-800 dark:hover:border-blue-400 dark:hover:bg-blue-900/20"
          >
            <div className="group-hover:bg-primary-100 group-hover:text-primary-600 mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition dark:bg-gray-700 dark:text-gray-500 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400">
              <PlusIcon className="h-8 w-8" />
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Create New Template
            </p>
          </button>

          {/* Template Cards */}
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="group cursor-pointer rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
            >
              <div
                className={`mb-3 flex h-20 w-full items-center justify-center rounded-xl bg-gradient-to-r ${template.color}`}
              >
                <span className="text-4xl">{template.image}</span>
              </div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                {template.name}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {template.category} • {template.posts} posts
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button className="flex-1 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700">
                  Use Template
                </button>
                <button className="rounded-lg border border-gray-200 p-1.5 text-gray-500 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700">
                  <ShareIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            <DocumentTextIcon className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600" />
            <p className="mt-2">No templates found</p>
          </div>
        )}
      </div>

      {/* Ready Template Section */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
          Ready Template
        </h2>

        {/* Row 1: Cards 1, 2, 3 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Suzuki Congratulations (Upload Photo) */}
          <div className="flex flex-col">
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-b from-slate-900 to-blue-950 shadow-xl dark:border-gray-800">
              <div className="flex items-center justify-start p-4">
                <span className="text-xl font-black tracking-wider text-red-600 italic">
                  S SUZUKI
                </span>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                className="hidden"
              />

              {/* Upload button with image preview */}
              <button
                onClick={handleUploadClick}
                className="relative mx-6 my-2 flex h-40 flex-col items-center justify-center rounded-full border border-dashed border-slate-500 bg-slate-800/50 text-center transition hover:border-slate-300 hover:bg-slate-700/50"
              >
                {uploadedImage ? (
                  <img
                    src={uploadedImage}
                    alt="Uploaded"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <>
                    <PhotoIcon className="h-6 w-6 text-slate-400" />
                    <span className="mt-2 text-xs font-medium text-slate-300">
                      Click to upload photo
                    </span>
                  </>
                )}
              </button>

              <div className="relative mt-2 px-6 pb-4 text-center text-white">
                <div className="mb-2 h-1 w-full rounded-full bg-gradient-to-r from-red-600 via-red-400 to-red-600" />
                <h3 className="text-3xl font-black tracking-wide text-white">
                  CONGRATULATIONS
                </h3>
                <p className="mt-2 text-xs text-slate-300">
                  Your dedication and excellence shine brighter than gold.
                </p>
                <p className="text-xs text-slate-300">
                  We are proud of your remarkable achievement!
                </p>
              </div>

              <TemplateFooter
                name="SHRI VINAYAK WHEELS PVT. LTD."
                location="Kudal"
                phone="9423989781"
              />
            </div>
          </div>
          {/* Card 2: Excellence Award (Gold / Dark Theme) */}
          <div className="flex flex-col">
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-amber-900/30 bg-gradient-to-b from-neutral-900 via-stone-900 to-black text-white shadow-xl">
              <div className="flex items-center justify-between p-4">
                <span className="rounded bg-white px-2 py-1 text-[10px] font-bold text-stone-900">
                  AWARD⁺
                </span>
                <span className="text-sm font-extrabold tracking-tight">
                  Auto<span className="text-red-500">Book</span>
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-center px-6 pb-4 text-center">
                <CurvedText text="CONGRATULATIONS" id="curve-award" />
                <div className="my-1 flex justify-center gap-1 text-amber-300">
                  <StarIcon className="h-4 w-4" />
                  <StarIcon className="h-5 w-5" />
                  <StarIcon className="h-4 w-4" />
                </div>
                <span className="text-xs font-semibold tracking-widest text-amber-400/90 uppercase">
                  Excellence Award
                </span>
                <h3 className="mt-2 text-2xl font-extrabold text-white">
                  Top Performer <br /> of the Month
                </h3>
                <p className="mt-4 text-xs leading-relaxed text-amber-100/70">
                  Your dedication and excellence shine brighter than gold. We
                  are proud of your remarkable achievement!
                </p>
              </div>

              <TemplateFooter
                name="BN THAKUR SUZUKI"
                location="MAPUSA DULER, GOA"
                phone="8879941296"
              />
            </div>
          </div>

          {/* Card 3: Milestone / Record Breaking (Light Theme) */}
          <div className="flex flex-col">
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-pink-200 bg-gradient-to-b from-pink-50 via-rose-50 to-pink-100 text-slate-800 shadow-xl">
              <div className="flex items-center justify-between p-4">
                <span className="rounded bg-pink-100 px-2 py-1 text-[10px] font-bold text-pink-900">
                  MILESTONE
                </span>
                <span className="text-sm font-extrabold tracking-tight">
                  Auto<span className="text-red-500">Book</span>
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-center px-6 pb-4 text-center">
                <CurvedText
                  text="CONGRATULATIONS"
                  color="#be123c"
                  id="curve-milestone"
                />
                <span className="inline-block rounded-full bg-rose-700/90 px-4 py-1.5 text-xs font-bold text-white shadow">
                  Great Achievement!
                </span>
                <div className="my-2 flex justify-center gap-2 text-pink-400">
                  <AcademicCapIcon className="h-5 w-5" />
                  <StarIcon className="h-5 w-5" />
                  <AcademicCapIcon className="h-5 w-5" />
                </div>
                <h3 className="text-3xl font-black tracking-tight text-rose-800">
                  You Did It!
                </h3>
                <p className="mt-1 text-xs font-bold tracking-widest text-rose-600">
                  RECORD BREAKING SALES
                </p>
                <p className="mt-4 text-xs leading-relaxed text-slate-600">
                  Your passion, persistence and performance have set a new
                  benchmark. The entire Suzuki family celebrates your success!
                </p>
              </div>

              <TemplateFooter
                name="BN THAKUR SUZUKI"
                location="MAPUSA DULER, GOA"
                phone="8879941296"
              />
            </div>
          </div>
        </div>

        {/* Buttons - Below Card 1 position */}
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700">
              <PhotoIcon className="h-4 w-4" /> Upload Photo
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-600 py-2.5 text-xs font-semibold text-white transition hover:bg-emerald-700">
              <ArrowDownTrayIcon className="h-4 w-4" /> Download PNG
            </button>
          </div>
          {/* Empty divs to maintain grid alignment with cards 2 and 3 */}
          <div></div>
          <div></div>
        </div>

        {/* Row 2: Card 4 - Below the buttons */}
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Card 4: Cheers / Best Team of the Year (Teal Theme) */}
          <div className="flex flex-col">
            <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-cyan-900/30 bg-gradient-to-b from-slate-900 via-teal-950 to-slate-900 text-white shadow-xl">
              <div className="flex items-center justify-between p-4">
                <span className="rounded bg-cyan-400 px-2 py-1 text-[10px] font-bold text-slate-900">
                  CHEERS!
                </span>
                <span className="text-sm font-extrabold tracking-tight">
                  Auto<span className="text-red-500">Book</span>
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-center px-6 pb-4 text-center">
                <CurvedText
                  text="CONGRATULATIONS"
                  color="#22d3ee"
                  id="curve-cheers"
                />
                <div className="my-2 flex justify-center gap-2 text-cyan-300">
                  <RocketLaunchIcon className="h-6 w-6" />
                  <TrophyIcon className="h-6 w-6" />
                  <FireIcon className="h-6 w-6" />
                  <TrophyIcon className="h-6 w-6" />
                  <UserGroupIcon className="h-6 w-6" />
                </div>
                <h3 className="text-3xl font-black tracking-tight text-cyan-300">
                  YOU'RE <br /> A STAR!
                </h3>
                <p className="mt-1 text-xs font-bold tracking-widest text-slate-300">
                  BEST TEAM OF THE YEAR
                </p>
                <p className="mt-4 text-xs leading-relaxed text-slate-400">
                  Together you achieved what seemed impossible. Your teamwork,
                  dedication and spirit made all the difference. Keep shining!
                </p>
              </div>

              <TemplateFooter
                name="BN THAKUR SUZUKI"
                location="MAPUSA DULER, GOA"
                phone="8879941296"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
