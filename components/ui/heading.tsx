interface HeadingProps {
  title: string;
  description?: string;
}

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <div>
      <h1 className="text-3xl font-semibold">{title}</h1>
      {description && <p className="text-muted-foreground">{description}</p>} 
    </div>
  );
};

export default Heading;
