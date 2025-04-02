"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Search,
  Home,
  FileText,
  FileKey,
  Users,
  BarChart2,
  Shield,
  Settings,
  HelpCircle,
  Calendar,
  Upload,
  Menu,
} from "lucide-react";
import Link from "next/link";

interface FormData {
  title: string;
  description: string;
  date: string;
  rights: string;
  files: File[];
}

// Form Field Component
interface FormFieldProps {
  number: string;
  label: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  select?: boolean;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  field: keyof FormData;
}

function FormField({
  number,
  label,
  placeholder,
  type = "text",
  textarea,
  select,
  formData,
  setFormData,
  field,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#222] text-center text-sm flex items-center justify-center rounded-sm">
          {number}
        </div>
        <label className="text-sm font-medium">{label}</label>
      </div>
      {textarea ? (
        <textarea
          value={formData[field] as string}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [field]: e.target.value }))
          }
          className="w-full p-3 bg-[#121212] text-white text-sm border border-[#333] rounded-md focus:outline-none focus:border-[#fa5f02]"
          placeholder={placeholder}
          rows={4}
        />
      ) : select ? (
        <select
          value={formData[field] as string}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [field]: e.target.value }))
          }
          className="w-full p-3 bg-[#121212] text-white text-sm border border-[#333] rounded-md focus:outline-none focus:border-[#fa5f02]"
        >
          <option value="">Select an option</option>
          <option value="exclusive">Exclusive Rights</option>
          <option value="non-exclusive">Non-Exclusive Rights</option>
          <option value="limited">Limited Rights</option>
        </select>
      ) : (
        <input
          type={type}
          value={formData[field] as string}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, [field]: e.target.value }))
          }
          className="w-full p-3 bg-[#121212] text-white text-sm border border-[#333] rounded-md focus:outline-none focus:border-[#fa5f02]"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}

// Sidebar Item Component
interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function SidebarItem({ icon, label, active = false }: SidebarItemProps) {
  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-md ${
        active ? "bg-[#1a1a1a]" : "hover:bg-[#1a1a1a]/50"
      }`}
    >
      <div className="w-5 h-5 text-[#888888]">{icon}</div>
      <span className={active ? "font-medium" : "text-[#888888]"}>{label}</span>
    </div>
  );
}

// Date Picker Field Component
interface DatePickerFieldProps {
  number: string;
  label: string;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

function DatePickerField({
  number,
  label,
  selectedDate,
  setSelectedDate,
  formData,
  setFormData,
}: DatePickerFieldProps) {
  return (
    <div className="space-y-2 relative">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#222] text-center text-sm flex items-center justify-center rounded-sm">
          {number}
        </div>
        <label className="text-sm font-medium">{label}</label>
      </div>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setFormData((prev) => ({
              ...prev,
              date: date?.toISOString().split("T")[0] || "",
            }));
          }}
          className="w-full p-3 bg-[#121212] text-white text-sm border border-[#333] rounded-md focus:outline-none focus:border-[#fa5f02]"
          placeholderText="Select a date"
        />
        <Calendar className="absolute right-3 top-3 text-gray-400 w-5 h-5 pointer-events-none" />
      </div>
    </div>
  );
}

// File Upload Component
interface FileUploadFieldProps {
  number: string;
  label: string;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

function FileUploadField({
  number,
  label,
  formData,
  setFormData,
}: FileUploadFieldProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({ ...prev, files }));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#222] text-center text-sm flex items-center justify-center rounded-sm">
          {number}
        </div>
        <label className="text-sm font-medium">{label}</label>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 px-4 py-2 bg-[#222] text-white rounded-md cursor-pointer hover:bg-[#333] transition-colors"
        >
          <Upload className="w-5 h-5" />
          Choose Files
        </label>
      </div>
      <div className="text-sm text-gray-400 max-h-24 overflow-y-auto">
        {formData.files.length > 0
          ? formData.files.map((file) => <div key={file.name}>{file.name}</div>)
          : "No files selected"}
      </div>
    </div>
  );
}

// Simulated API service
const api = {
  registerIP: async (data: any) => {
    // Simulate API request delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In a real app, this would be a fetch/axios call to your backend
    console.log("Data sent to backend:", data);

    // Simulate a successful response with registration ID
    return {
      success: true,
      registrationId: `ZPK-${new Date().toISOString().slice(0, 10)}-${Math.floor(
        Math.random() * 10000
      )}`,
    };
  },
};

export default function RegisterIP() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: "",
    rights: "",
    files: [],
  });

  useEffect(() => {
    setMounted(true);
    const filledFields = Object.values(formData).filter((val) => {
      if (Array.isArray(val)) return val.length > 0;
      return val !== "";
    }).length;
    setProgress((filledFields / 5) * 100);
  }, [formData]);

  const handleClickOutside = (e: MouseEvent) => {
    if (isMobileMenuOpen && e.target instanceof HTMLElement) {
      const sidebar = document.getElementById("sidebar");
      const sidebarToggle = document.getElementById("sidebar-toggle");
      if (
        sidebar &&
        !sidebar.contains(e.target) &&
        !sidebarToggle?.contains(e.target)
      ) {
        setIsMobileMenuOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  if (!mounted) return null;

  const handleSubmit = async () => {
    // Validation
    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.rights
    ) {
      // Show error message
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("date", formData.date);
    formDataToSend.append("rights", formData.rights);

    formData.files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const response = await fetch(
        `${backendUrl}/api/ip-registrations/register`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Success - show registration ID
        alert(
          `Registration successful! Your registration ID is ${result.registrationId}`
        );

        // Optionally redirect to a success page or dashboard
        router.push(`register/confirmation`);
      } else {
        // Error handling
        alert(`Registration failed: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar - Now static */}
      <div
        id="sidebar"
        className="w-64 border-r border-[#333] p-4 bg-black h-screen sticky top-0 hidden lg:block"
      >
        <div className="mb-6 flex justify-center">
          <div className="text-xl font-bold text-[#fa5f02]">IP REGISTER</div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-[#1a1a1a] rounded-md text-sm border border-[#333] focus:outline-none focus:border-[#fa5f02]"
          />
        </div>

        <div className="space-y-1">
          <Link href="/">
            <SidebarItem icon={<Home />} label="Dashboard" />
          </Link>
          <Link href="/register">
            <SidebarItem icon={<FileText />} label="Register IP" active />
          </Link>
          <SidebarItem icon={<FileKey />} label="Generate ZPK" />
          <SidebarItem icon={<Users />} label="Collaborations" />
          <SidebarItem icon={<BarChart2 />} label="Analytics" />
          <Link href="/credentials">
            <SidebarItem icon={<Shield />} label="Credentials" />
          </Link>
          <SidebarItem icon={<Settings />} label="Settings" />
          <SidebarItem icon={<HelpCircle />} label="Help" />
        </div>
      </div>

      {/* Mobile Menu - Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`lg:hidden fixed inset-y-0 left-0 z-40 w-64 border-r border-[#333] p-4 bg-black transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-6 flex justify-center">
          <div className="text-xl font-bold text-[#fa5f02]">IP REGISTER</div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2 bg-[#1a1a1a] rounded-md text-sm border border-[#333] focus:outline-none focus:border-[#fa5f02]"
          />
        </div>

        <div className="space-y-1">
          <Link href="/">
            <SidebarItem icon={<Home />} label="Dashboard" />
          </Link>
          <Link href="/register">
            <SidebarItem icon={<FileText />} label="Register IP" active />
          </Link>
          <SidebarItem icon={<FileKey />} label="Generate ZPK" />
          <SidebarItem icon={<Users />} label="Collaborations" />
          <SidebarItem icon={<BarChart2 />} label="Analytics" />
          <Link href="/credentials">
            <SidebarItem icon={<Shield />} label="Credentials" />
          </Link>
          <SidebarItem icon={<Settings />} label="Settings" />
          <SidebarItem icon={<HelpCircle />} label="Help" />
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      <button
        id="sidebar-toggle"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-[#1a1a1a] hover:bg-[#222] transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main Content */}
      <div className="flex-1 p-4 pt-16 lg:pt-8 lg:p-8">
        <div className="max-w-3xl mx-auto w-full">
          <div className="mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-medium text-[#fa5f02]">
              REGISTER YOUR IP
            </h1>
            <h2 className="text-xl sm:text-2xl font-medium mt-2">
              We just need some information
            </h2>

            {/* Progress Bar */}
            <div className="relative h-2 w-full max-w-md bg-[#222] mx-auto mt-6">
              <div
                className="absolute h-full bg-[#fa5f02] transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {Math.round(progress)}% Complete
            </div>
          </div>

          {/* Form */}
          <div className="space-y-6 mx-auto bg-[#0a0a0a] border border-[#222] rounded-lg p-6">
            <FormField
              number="1"
              label="Asset Title"
              placeholder="Enter title..."
              formData={formData}
              setFormData={setFormData}
              field="title"
            />
            <FormField
              number="2"
              label="Description"
              placeholder="Enter description..."
              textarea
              formData={formData}
              setFormData={setFormData}
              field="description"
            />
            <DatePickerField
              number="3"
              label="Creation Date"
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              formData={formData}
              setFormData={setFormData}
            />
            <FormField
              number="4"
              label="Rights Management"
              select
              formData={formData}
              setFormData={setFormData}
              field="rights"
            />
            <FileUploadField
              number="5"
              label="Upload Files"
              formData={formData}
              setFormData={setFormData}
            />

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <button
                className={`px-8 py-3 bg-[#fa5f02] font-medium hover:bg-[#d94e00] transition-colors rounded-full text-lg w-full sm:w-auto flex items-center justify-center gap-2 ${
                  isSubmitting ? "cursor-wait" : ""
                }`}
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    Submitting...
                  </>
                ) : (
                  <>
                    Register Now
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
