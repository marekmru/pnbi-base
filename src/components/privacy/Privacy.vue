<template>
  <v-container>
    <v-layout row wrap>
      <v-flex class="headline">Datenschutzerklärung</v-flex>
      <v-flex d-flex xs12>
        <v-layout column>
          <v-flex>
            <v-card flat>
              <v-card-text>Hier finden Sie Informationen über den Umgang mit Ihren personenbezogenen Daten beim Besuch unserer Website. Zur Bereitstellung der Funktionen und Dienste unserer Website ist es erforderlich, dass wir personenbezogene Daten über Sie erheben. Nachfolgend erklären wir, welche Daten wir über Sie erheben, wozu dies erforderlich ist, und welche Rechte Sie in Bezug auf Ihre Daten haben. Verantwortlich für die Verarbeitung von personenbezogenen Daten auf dieser Website ist (vgl.
                <span class="link" @click="onClick()">Impressum</span>):
              </v-card-text>
              <v-card-text>Plan.Net Business Intelligence GmbH & Co. KG
                <br>Brienner Str. 45a-d, 80333 München / Deutschland
                <br>Telefon: +49 89 2050 20
                <br>Telefax: +49 89 2050 2111
                <br>E-Mail:
                <a href="mailto:bi-ops@plan-net.com">bi-ops@plan-net.com</a>
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text>Sie können sich bei Fragen zum Datenschutz auch jederzeit unter
                <a href="mailto:privacy@plan-net.com">privacy@plan-net.com</a>
                an unseren Datenschutzbeauftragten wenden.</v-card-text>
            </v-card>
          </v-flex>
          <v-divider></v-divider>
          <v-flex>
            <v-card flat>
              <v-card-text class="title pb-0">Informatorische Nutzung</v-card-text>
              <v-card-text class="">Wenn Sie diese Website nutzen, ohne anderweitig (z.B. durch Registrierung oder Nutzung des Kontaktformulars) Daten an uns zu übermitteln, erheben wir nur technisch notwendige Daten, die automatisch an unseren Server übermittelt werden (z.B. IP-Adresse, Datum und Uhrzeit der Anfrage, Browsertyp und Betriebssystem). Dies ist technisch erforderlich, um Ihnen unsere Website anzeigen zu können. Soweit davon personenbezogene Daten betroffen sind, ist Art. 6 Abs. 1 lit. f DSGVO Rechtsgrundlage für die Erhebung.
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text class="title pb-0">Verwendung von Cookies</v-card-text>
              <v-card-text class="">Wir verwenden Cookies, um die Benutzung unserer Website zu erleichtern und zu verbessern. Cookies sind Textinformationen, die beim Besuch einer Website über den Webbrowser auf einem Computer gespeichert werden. Dies dient der Wiedererkennung einer Sitzung, beispielsweise beim dauerhaften Login auf einer Website oder bei der Warenkorbfunktion eines Online-Shops. Die meisten Webbrowser akzeptieren Cookies automatisch. Gespeicherte Cookies können Sie jederzeit über die Einstellungen Ihres Webbrowsers löschen. Sie können auch die Einstellungen Ihres Webbrowsers so anpassen, dass keine Cookies gespeichert werden. Dann sind unter Umständen nicht alle Funktionen unserer Website verfügbar.
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text class="title pb-0">Kontaktformular</v-card-text>
              <v-card-text class="">Auf unserer Website können Sie über ein Kontaktformular personenbezogene Daten eingeben. Wenn Sie das Kontaktformular nutzen, erheben und speichern wir die Daten, die Sie in die Eingabemaske eingeben (z.B. Nachname, Vorname, E-Mail-Adresse). Eine Weitergabe an Dritte findet nicht statt. Rechtsgrundlage für die Verarbeitung ist im Falle einer Einwilligung Art. 6 Abs. 1 lit. a DSGVO. Dient Ihre Anfrage der Vorbereitung eines Vertragsabschlusses ist Art. 6 Abs. 1 lit. b DSGVO zusätzliche Rechtsgrundlage. Die Daten verwenden wir ausschließlich, um Ihre Anfrage zu bearbeiten und zu beantworten.
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text class="title pb-0">Registrierung</v-card-text>
              <v-card-text class="">Auf unserer Website können Sie sich registrieren. Wenn Sie sich registrieren, erheben und speichern wir die Daten, die Sie in die Eingabemaske eingeben (z.B. Nachname, Vorname, E-Mail-Adresse). Eine Weitergabe an Dritte findet nicht statt. Rechtsgrundlage für die Verarbeitung ist im Falle einer Einwilligung Art. 6 Abs. 1 lit. a DSGVO. Dient Ihre Registrierung der Vorbereitung eines Vertragsabschlusses ist Art. 6 Abs. 1 lit. b DSGVO zusätzliche Rechtsgrundlage.Ihre Registrierung ist für die Nutzung bestimmter Inhalte und Leistungen auf unserer Website erforderlich bzw. für die Erfüllung eines Vertrags oder zur Durchführung vorvertraglicher Maßnahmen erforderlich.
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text class="title pb-0">Kommentarfunktion</v-card-text>
              <v-card-text class="">Auf unserer Website können Sie Beiträge kommentieren. Wenn Sie einen Beitrag kommentieren, erheben und speichern wir die Daten, die Sie in die Eingabemaske eingeben (z.B. Nachname, Vorname, E-Mail-Adresse). Eine Weitergabe an Dritte findet nicht statt. Rechtsgrundlage für die Verarbeitung ist im Falle einer Einwilligung Art. 6 Abs. 1 lit. a DSGVO. Die Erhebung der Daten dient der Durchsetzung unserer Kommentierungs-Regeln.
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text class="title pb-0">Speicherdauer</v-card-text>
              <v-card-text class="">Wir verarbeiten und speichern Ihre Daten nur so lange, wie dies für die Verarbeitung oder zur Einhaltung gesetzlicher Pflichten erforderlich ist. Nach Wegfall des Verarbeitungszwecks werden Ihre Daten gesperrt oder gelöscht. Sofern darüber hinaus gesetzliche Pflichten zur Speicherung bestehen, sperren oder löschen wir Ihre Daten mit Ablauf der gesetzlichen Speicherfristen.
              </v-card-text>
            </v-card>
            <v-card flat>
              <v-card-text class="title pb-0">Ihre Rechte</v-card-text>
              <v-card-text class="">Sie haben bezüglich der Sie betreffenden personenbezogenen Daten folgende gesetzliche Rechte gegenüber uns:
                <ol class="pl-3 pr-2">
                  <li>
                    <v-card flat>
                      <v-card-text class="subheading pb-0">Auskunftsrecht</v-card-text>
                      <v-card-text class="pt-1">Sie haben als betroffene Person das Recht, eine Bestätigung darüber zu verlangen, ob wir personenbezogene Daten verarbeiten, die Sie betreffen. Ist dies der Fall, so haben Sie das Recht auf Auskunft über diese personenbezogenen Daten sowie auf weitere Informationen, z.B. die Verarbeitungszwecke, die Empfänger und die geplante Dauer der Speicherung bzw. die Kriterien für die Festlegung der Dauer.
                      </v-card-text>
                    </v-card>
                  </li>
                  <li>
                    <v-card flat>
                      <v-card-text class="subheading pb-0">Recht auf Berichtigung und Vervollständigung</v-card-text>
                      <v-card-text class="pt-1">Sie haben als betroffene Person das Recht, unverzüglich die Berichtigung unrichtiger Daten zu verlangen. Unter Berücksichtigung der Zwecke der Verarbeitung haben Sie das Recht, die Vervollständigung unvollständiger Daten zu verlangen.
                      </v-card-text>
                    </v-card>
                  </li>
                  <li>
                    <v-card flat>
                      <v-card-text class="subheading pb-0">Recht auf Löschung („Recht auf Vergessenwerden“)</v-card-text>
                      <v-card-text class="pt-1">Sie haben als betroffene Person ein Recht zur Löschung, soweit die Verarbeitung nicht erforderlich ist. Dies ist beispielsweise der Fall, wenn Ihre Daten für die ursprünglichen Zwecke nicht mehr notwendig sind, sie Ihre datenschutzrechtliche Einwilligungserklärung widerrufen haben oder die Daten unrechtmäßig verarbeitet wurden.
                      </v-card-text>
                    </v-card>
                  </li>
                  <li>
                    <v-card flat>
                      <v-card-text class="subheading pb-0">Auskunftsrecht</v-card-text>
                      <v-card-text class="pt-1">Sie haben als betroffene Person das Recht, eine Bestätigung darüber zu verlangen, ob wir personenbezogene Daten verarbeiten, die Sie betreffen. Ist dies der Fall, so haben Sie das Recht auf Auskunft über diese personenbezogenen Daten sowie auf weitere Informationen, z.B. die Verarbeitungszwecke, die Empfänger und die geplante Dauer der Speicherung bzw. die Kriterien für die Festlegung der Dauer.
                      </v-card-text>
                    </v-card>
                  </li>
                  <li>
                    <v-card flat>
                      <v-card-text class="subheading pb-0">Recht auf Einschränkung der Verarbeitung</v-card-text>
                      <v-card-text class="pt-1">Sie haben als betroffene Person ein Recht auf Einschränkung der Verarbeitung, z.B. wenn Sie der Meinung sind, die personenbezogenen Daten seien unrichtig.
                      </v-card-text>
                    </v-card>
                  </li>
                  <li>
                    <v-card flat>
                      <v-card-text class="subheading pb-0">Recht auf Datenübertragbarkeit</v-card-text>
                      <v-card-text class="pt-1">Sie haben als betroffene Person das Recht, die Sie betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.
                      </v-card-text>
                    </v-card>
                  </li>
                  <li>
                    <v-card flat>
                      <v-card-text class="subheading pb-0">Widerspruchsrecht</v-card-text>
                      <v-card-text class="pt-1">Sie haben als betroffene Person das Recht, jederzeit aus Gründen, die sich aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung bestimmter Sie betreffender personenbezogener Daten Widerspruch einzulegen. Im Falle von Direktwerbung haben Sie als betroffene Person das Recht, jederzeit Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.
                      </v-card-text>
                    </v-card>
                  </li>
                  <li>
                    <v-card flat>
                      <v-card-text class="subheading pb-0">Recht auf Widerruf Ihrer datenschutzrechtlichen Einwilligung</v-card-text>
                      <v-card-text class="pt-1">Sie können eine Einwilligung in die Verarbeitung Ihrer personenbezogenen Daten jederzeit mit Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung wird davon jedoch nicht berührt.
                      </v-card-text>
                    </v-card>
                  </li>
                </ol><br>Außerdem können Sie jederzeit Beschwerde bei einer Datenschutzaufsichtsbehörde einlegen, wenn Sie der Meinung sind, dass die Datenverarbeitung nicht im Einklang mit datenschutzrechtlichen Vorschriften steht.
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

export default {
  props: {
    type: String
  },
  methods: {
    onClick () {
      if (this.type === 'dialog') {
        this.$emit('imprint-click')
      } else {
        this.$router.push('imprint')
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.link {
  text-decoration: underline;
  cursor: pointer;
  color: #d70f14;
}
.v-card__text {
  padding-left: 0;
}
</style>
