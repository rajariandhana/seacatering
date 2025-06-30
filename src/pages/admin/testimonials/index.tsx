import DashboardLayout from "@/components/DashboardLayout";
import { Testimonial } from "@/components/views/home/TestimonialCard";
import testimonialServices from "@/services/testimonial.service";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { useState, useEffect, useCallback, useMemo } from "react";
import { ITestimonial } from "@/types/Testimonial";
import Rating from "@mui/material/Rating";

const columns = [
  {key: "name",label: "Name"},
  {key: "message",label: "Message"},
  {key: "star",label: "Star"},
];

const summaryColumns = [
  { key: "star", label: "Star Rating" },
  { key: "count", label: "Reviews" },
];

const Testimonials=()=>{
  const [testimonials, setTestimonials]=useState<Testimonial[]>([]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialServices.index();
        setTestimonials(response.data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        // setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const starSummary = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => {
      const star = i + 1;
      const count = testimonials.filter((t) => t.star === star).length;
      return { star, count };
    });
  }, [testimonials]);

  return (
    <DashboardLayout title="Testimonials" type="admin">
      <Table radius="sm" className="w-[400px] mb-8">
        <TableHeader columns={summaryColumns}>
          {(column) => (
            <TableColumn key={column.key} align={`${column.key==='count'?"center":"start"}`}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={starSummary} emptyContent={"No summary to show."}>
          {(item) => (
            <TableRow key={item.star}>
              {(columnKey) => (
                <TableCell>
                  {columnKey === "star" ? (
                    <Rating value={item.star} />
                  ) : (
                    item[columnKey as "count"]
                  )}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Table radius="sm" className="w-[400px] md:w-[800px]">
        <TableHeader columns={columns}>
          {(column)=>(
            <TableColumn key={column.key} align={`${column.key==='star'?"center":"start"}`}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={testimonials} emptyContent={"No rows to display."}>
          {(testimonial)=>(
            <TableRow key={testimonial.name}>
              {(columnKey) => <TableCell>{testimonial[columnKey as keyof ITestimonial]}</TableCell>}
            </TableRow> 
          )}
        </TableBody>
      </Table>
    </DashboardLayout>
  )
}
export default Testimonials;