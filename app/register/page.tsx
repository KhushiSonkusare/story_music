"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { 
  Search, Home, FileText, FileKey, Users, BarChart2, Shield, Settings, HelpCircle, Calendar, Upload 
} from "lucide-react";

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

function FormField({ number, label, placeholder, type = "text", textarea, select, formData, setFormData, field }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#222] text-center text-sm">{number}</div>
        <label className="text-sm font-medium">{label}</label>
      </div>
      {textarea ? (
        <textarea
          value={formData[field] as string}
          onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
          className="w-full p-3 bg-[#121212] text-white text-sm border border-[#333] rounded-md focus:outline-none focus:border-[#fa5f02]"
          placeholder={placeholder}
        />
      ) : select ? (
        <select
          value={formData[field] as string}
          onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
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
          onChange={(e) => setFormData(prev => ({ ...prev, [field]: e.target.value }))}
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
    <div className={`flex items-center gap-3 p-3 rounded-md ${active ? "bg-[#1a1a1a]" : "hover:bg-[#1a1a1a]/50"}`}>
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

function DatePickerField({ number, label, selectedDate, setSelectedDate, formData, setFormData }: DatePickerFieldProps) {
  return (
    <div className="space-y-2 relative">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#222] text-center text-sm">{number}</div>
        <label className="text-sm font-medium">{label}</label>
      </div>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setFormData(prev => ({ ...prev, date: date?.toISOString().split("T")[0] || "" }));
          }}
          className="w-full p-3 bg-[#121212] text-white text-sm border border-[#333] rounded-md focus:outline-none focus:border-[#fa5f02]"
          placeholderText="Select a date"
        />
        <Calendar className="absolute right-3 top-3 text-gray-400 w-5 h-5" />
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

function FileUploadField({ number, label, formData, setFormData }: FileUploadFieldProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, files }));
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-[#222] text-center text-sm">{number}</div>
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
          className="flex items-center gap-2 px-4 py-2 bg-[#222] text-white rounded-md cursor-pointer"
        >
          <Upload className="w-5 h-5" />
          Choose Files
        </label>
      </div>
      <div className="text-sm text-gray-400">
        {formData.files.length > 0 ? formData.files.map(file => <div key={file.name}>{file.name}</div>) : "No files selected"}
      </div>
    </div>
  );
}

export default function RegisterIP() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    date: "",
    rights: "",
    files: [],
  });

  useEffect(() => {
    setMounted(true);
    const filledFields = Object.values(formData).filter((val) => val !== "" && val.length > 0).length;
    setProgress((filledFields / 5) * 100);
  }, [formData]);

  if (!mounted) return null;

  const handleSubmit = () => {
    router.push("/register/confirmation");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-[#333] p-4 fixed left-0 top-0 h-screen">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 w-full bg-[#1a1a1a] text-white rounded-md focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <SidebarItem icon={<Home />} label="Dashboard" />
          <SidebarItem icon={<FileText />} label="Register IP" active />
          <SidebarItem icon={<FileKey />} label="Generate ZPK" />
          <SidebarItem icon={<Users />} label="Collaborations" />
          <SidebarItem icon={<BarChart2 />} label="Analytics" />
          <SidebarItem icon={<Shield />} label="Credentials" />
          <SidebarItem icon={<Settings />} label="Settings" />
          <SidebarItem icon={<HelpCircle />} label="Help" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-medium text-[#fa5f02]">REGISTER YOUR IP</h1>
          <h2 className="text-2xl font-medium">We just need some information</h2>

          {/* Progress Bar */}
          <div className="relative h-2 w-1/2 bg-[#222] mx-auto mt-4">
            <div className="absolute h-full bg-[#fa5f02] transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Form */}
        <div className="space-y-6 max-w-2xl mx-auto">
          <FormField number="1" label="Asset Title" placeholder="Enter title..." formData={formData} setFormData={setFormData} field="title" />
          <FormField number="2" label="Description" placeholder="Enter description..." textarea formData={formData} setFormData={setFormData} field="description" />
          <DatePickerField number="3" label="Creation Date" selectedDate={selectedDate} setSelectedDate={setSelectedDate} formData={formData} setFormData={setFormData} />
          <FormField number="4" label="Rights Management" select formData={formData} setFormData={setFormData} field="rights" />
          <FileUploadField number="5" label="Upload Files" formData={formData} setFormData={setFormData} />

          {/* Submit Button */}
          <button 
            className="w-full py-3 bg-[#fa5f02] font-medium hover:bg-[#d94e00] transition" 
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
