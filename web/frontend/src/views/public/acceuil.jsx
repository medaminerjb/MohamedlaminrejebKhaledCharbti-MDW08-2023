import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "../../components/header";
import Footer from "../../components/footer";

import Reash from "../../form/resarch";
import "../../index2.css";

export default function Acceuil() {
return (
<div>
<Header />
<div class="landing">
<div>
<Reash />
</div>
</div>
<Footer />
</div>
);
}