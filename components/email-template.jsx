import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { render } from '@react-email/render'; // Import render method from react-email
import * as React from 'react';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const EmailTemplate = ({
  name = '',
  redirectUrl = '/login',
  linkText,
  description,
  subject,
}) => {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text style={title}>{linkText}</Text>

          <Section style={section}>
            <Text style={text}>
              Hey <strong>{name}</strong>!
            </Text>
            <Text style={text}>{description}</Text>

            <Link style={button} href={`${baseUrl}/${redirectUrl}`}>
              {linkText}
            </Link>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Function to generate the email HTML string
export const generateEmailHtml = (props) => {
  return render(<EmailTemplate {...props} />);
};

export default EmailTemplate;

const main = {
  backgroundColor: '#ffffff',
  color: '#24292e',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
};

const container = {
  width: '480px',
  margin: '0 auto',
  padding: '20px 0 48px',
};

const title = {
  fontSize: '24px',
  lineHeight: 1.25,
};

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  textAlign: 'center',
};

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left',
};

const button = {
  fontSize: '14px',
  backgroundColor: '#28a745',
  color: '#fff',
  lineHeight: 1.5,
  borderRadius: '0.5em',
  padding: '0.75em 1.5em',
};
