import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function BasicExample({titulo, desc, img, but}) {
  return (
    <Card style={{ width: '18rem' }}>
      {img && <Card.Img variant="top" src={img} />}
      <Card.Body>
        <Card.Title>{titulo}</Card.Title>
        <Card.Text>
          {desc} {/* Remova o <p> aqui! */}
        </Card.Text>
        {but}
      </Card.Body>
    </Card>
  );
}

export default BasicExample;