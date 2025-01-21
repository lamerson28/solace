import { Advocate } from "@/db/types";

interface AdvocatesTableProps {
  advocates: Advocate[];
}

export function AdvocatesTable({ advocates }: AdvocatesTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#1d4238]/5">
            <th className="p-3 text-left border-b-2 border-[#1d4238]/10 font-semibold text-[#1d4238]">First Name</th>
            <th className="p-3 text-left border-b-2 border-[#1d4238]/10 font-semibold text-[#1d4238]">Last Name</th>
            <th className="p-3 text-left border-b-2 border-[#1d4238]/10 font-semibold text-[#1d4238]">City</th>
            <th className="p-3 text-left border-b-2 border-[#1d4238]/10 font-semibold text-[#1d4238]">Degree</th>
            <th className="p-3 text-left border-b-2 border-[#1d4238]/10 font-semibold text-[#1d4238]">Specialties</th>
            <th className="p-3 text-left border-b-2 border-[#1d4238]/10 font-semibold text-[#1d4238]">Years of Experience</th>
            <th className="p-3 text-left border-b-2 border-[#1d4238]/10 font-semibold text-[#1d4238]">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {advocates.map((advocate) => (
            <tr key={advocate.id} className="hover:bg-[#1d4238]/5 transition-colors">
              <td className="p-3 border-b border-gray-200">{advocate.firstName}</td>
              <td className="p-3 border-b border-gray-200">{advocate.lastName}</td>
              <td className="p-3 border-b border-gray-200">{advocate.city}</td>
              <td className="p-3 border-b border-gray-200">{advocate.degree}</td>
              <td className="p-3 border-b border-gray-200">
                {advocate.specialties.map((specialty, index) => (
                  <div key={`${advocate.id}-${index}`} className="py-1">{specialty}</div>
                ))}
              </td>
              <td className="p-3 border-b border-gray-200">{advocate.yearsOfExperience}</td>
              <td className="p-3 border-b border-gray-200">{advocate.phoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 